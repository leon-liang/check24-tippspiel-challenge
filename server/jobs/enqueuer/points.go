package enqueuer

import (
	"github.com/gocraft/work"
)

type PointsEnqueuer struct {
	Enqueuer *work.Enqueuer
}

func NewPointsEnqueuer() *PointsEnqueuer {
	pointsEnqueuer := NewEnqueuer("points")
	return &PointsEnqueuer{
		Enqueuer: pointsEnqueuer,
	}
}
