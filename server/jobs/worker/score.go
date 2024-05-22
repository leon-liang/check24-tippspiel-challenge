package worker

import (
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
)

type ScoreWorkerPool struct {
	WorkerPool work.WorkerPool
}

type ScoreContext struct {
	us *store.UserStore
	ms *store.MatchStore
}

func NewScoreWorkerPool(us *store.UserStore, ms *store.MatchStore) *ScoreWorkerPool {
	scoreContext := ScoreContext{
		us: us,
		ms: ms,
	}
	scoreWorkerPool := NewWorkerPool(scoreContext, "calculate_points", 5)
	scoreWorkerPool.Job("calculate_points", (*ScoreContext).CalculatePoints)

	return &ScoreWorkerPool{
		WorkerPool: *scoreWorkerPool,
	}
}

func (ctx *ScoreContext) CalculatePoints(job *work.Job) error {
	return nil
}
