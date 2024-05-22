package worker

import (
	"fmt"
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
	"time"
)

type PointsWorkerPool struct {
	WorkerPool *work.WorkerPool
}

type PointsContext struct {
	users []model.User
}

func NewPointsWorkerPool(us *store.UserStore, ms *store.MatchStore) *PointsWorkerPool {
	scoreContext := PointsContext{}
	pointsWorkerPool := NewWorkerPool(scoreContext, "points", 5)
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
	time.Sleep(10 * time.Second)
	fmt.Println("Done")
	return nil
}
