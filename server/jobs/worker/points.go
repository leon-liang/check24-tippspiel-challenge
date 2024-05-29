package worker

import (
	"fmt"
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/mq"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
	"time"
)

type PointsWorkerPool struct {
	WorkerPool *work.WorkerPool
}

type PointsContext struct {
	us *store.UserStore
	bs *store.BetStore
	js *store.JobStore
	jw *mq.JobWriter
}

func NewPointsWorkerPool(us *store.UserStore, bs *store.BetStore, js *store.JobStore, jw *mq.JobWriter) *PointsWorkerPool {
	scoreContext := PointsContext{}
	pointsWorkerPool := NewWorkerPool(scoreContext, "points", 5)

	pointsWorkerPool.Middleware(func(ctx *PointsContext, job *work.Job, next work.NextMiddlewareFunc) error {
		ctx.us = us
		ctx.bs = bs
		ctx.js = js
		ctx.jw = jw
		return next()
	})

	pointsWorkerPool.Middleware((*PointsContext).Log)
	pointsWorkerPool.Job("calculate_points", (*PointsContext).CalculatePoints)

	return &PointsWorkerPool{
		WorkerPool: pointsWorkerPool,
	}
}

func (ctx *PointsContext) Log(job *work.Job, next work.NextMiddlewareFunc) error {
	fmt.Println("Starting job: ", job.Name)
	return next()
}

func (ctx *PointsContext) CalculatePoints(job *work.Job) error {
	limit := job.ArgInt64("limit")
	offset := job.ArgInt64("offset")
	if err := job.ArgError(); err != nil {
		return err
	}
	users, err := ctx.us.GetAll(int(offset), int(limit))
	if err != nil {
		return err
	}

	for _, user := range users {
		bets, err := ctx.bs.GetAllBets(&user)
		if err != nil {
			return err
		}

		points := 0
		for _, bet := range bets {
			if bet.HomeTeam != nil && bet.AwayTeam != nil && bet.Match.HomeTeamResult != nil && bet.Match.AwayTeamResult != nil {
				homeDiff := *bet.HomeTeam - *bet.Match.HomeTeamResult
				awayDiff := *bet.AwayTeam - *bet.Match.AwayTeamResult

				switch {
				case *bet.HomeTeam == *bet.Match.HomeTeamResult && *bet.AwayTeam == *bet.Match.AwayTeamResult:
					// 8 points for the exact result
					points += 8
				case homeDiff == awayDiff && *bet.Match.HomeTeamResult != *bet.Match.AwayTeamResult:
					// 6 points for the correct goal difference if not a draw
					points += 6
				case (homeDiff >= 0 && awayDiff >= 0) || (homeDiff < 0 && awayDiff < 0):
					// 4 points for the correct tendency
					points += 4
				}
			}
		}

		if err := ctx.us.UpdatePoints(&user, points); err != nil {
			return err
		}
	}

	// Update Job status
	j, err := ctx.js.GetByName(job.Name)
	if err != nil {
		return err
	}

	if err := ctx.js.SetStatus(j, j.Outstanding, j.Completed+1); err != nil {
		return err
	}

	if j.Completed == j.Outstanding {
		if err := ctx.js.UpdateCompletedAt(j, time.Now()); err != nil {
			return err
		}
	}

	ctx.jw.WriteJob(j)

	return nil
}
