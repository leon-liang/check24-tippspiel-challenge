package worker

import (
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/redis"
)

func NewWorkerPool(ctx interface{}, namespace string, poolSize int) *work.WorkerPool {
	redisPool := redis.NewRedisPool(poolSize, poolSize)
	return work.NewWorkerPool(ctx, 10, namespace, redisPool)
}
