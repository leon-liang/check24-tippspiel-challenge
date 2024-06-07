package worker

import (
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/redis"
)

func NewWorkerPool(ctx interface{}, namespace string) *work.WorkerPool {
	rp := redis.NewRedisPool(5, 5)
	return work.NewWorkerPool(ctx, 10, namespace, rp)
}
