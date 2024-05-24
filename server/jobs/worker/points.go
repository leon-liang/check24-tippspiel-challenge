package worker

import (
	"fmt"
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
)

type PointsWorkerPool struct {
	WorkerPool *work.WorkerPool
}

type PointsContext struct {
	us    *store.UserStore
	bs    *store.BetStore
	users []model.User
}

func NewPointsWorkerPool(us *store.UserStore, bs *store.BetStore) *PointsWorkerPool {
	scoreContext := PointsContext{}
	pointsWorkerPool := NewWorkerPool(scoreContext, "points", 5)

	pointsWorkerPool.Middleware(func(ctx *PointsContext, job *work.Job, next work.NextMiddlewareFunc) error {
		ctx.us = us
		ctx.bs = bs
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
				case homeDiff^awayDiff >= 0:
					// 4 points for the correct tendency
					points += 4
				}
			}
		}

		if err := ctx.us.UpdatePoints(&user, points); err != nil {
			return err
		}
	}
	return nil
}