package worker

import (
	"github.com/gocraft/work"
	"github.com/gomodule/redigo/redis"
)

func NewWorkerPool(ctx interface{}, redisPool *redis.Pool, namespace string) *work.WorkerPool {
	return work.NewWorkerPool(ctx, 10, namespace, redisPool)
}
