package enqueuer

import (
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/redis"
)

func NewEnqueuer(namespace string, poolSize int) *work.Enqueuer {
	redisPool := redis.NewRedisPool(poolSize, poolSize)
	return work.NewEnqueuer(namespace, redisPool)
}
