package enqueuer

import (
	"github.com/gocraft/work"
)

type PointsEnqueuer struct {
	Enqueuer *work.Enqueuer
}

func NewPointsEnqueuer() *PointsEnqueuer {
	pointsEnqueuer := NewEnqueuer("points", 5)

	return &PointsEnqueuer{
		Enqueuer: pointsEnqueuer,
	}
}
