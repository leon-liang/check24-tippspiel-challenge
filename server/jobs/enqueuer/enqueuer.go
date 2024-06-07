package enqueuer

import (
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/redis"
)

func NewEnqueuer(namespace string) *work.Enqueuer {
	rp := redis.NewRedisPool(5, 5)
	return work.NewEnqueuer(namespace, rp)
}
