package enqueuer

import (
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/redis"
)

type PointsEnqueuer struct {
	Enqueuer *work.Enqueuer
}

func NewPointsEnqueuer() *PointsEnqueuer {
	rp := redis.NewRedisPool(5, 5)
	pointsEnqueuer := NewEnqueuer("points", rp)

	return &PointsEnqueuer{
		Enqueuer: pointsEnqueuer,
	}
}
