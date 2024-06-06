package enqueuer

import (
	"github.com/gocraft/work"
	"github.com/gomodule/redigo/redis"
)

func NewEnqueuer(namespace string, rp *redis.Pool) *work.Enqueuer {
	return work.NewEnqueuer(namespace, rp)
}
