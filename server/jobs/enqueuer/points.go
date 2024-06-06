package enqueuer

import (
	"github.com/gocraft/work"
	"github.com/gomodule/redigo/redis"
)

type PointsEnqueuer struct {
	Enqueuer *work.Enqueuer
}

func NewPointsEnqueuer(rp *redis.Pool) *PointsEnqueuer {
	pointsEnqueuer := NewEnqueuer("points", rp)

	return &PointsEnqueuer{
		Enqueuer: pointsEnqueuer,
	}
}
