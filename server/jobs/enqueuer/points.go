package enqueuer

import (
	"fmt"
	"github.com/gocraft/work"
)

type PointsEnqueuer struct {
	Enqueuer *work.Enqueuer
}

func NewPointsEnqueuer() *PointsEnqueuer {
	pointsEnqueuer := NewEnqueuer("points", 5)

	fmt.Println("Initialised enqueuer")

	return &PointsEnqueuer{
		Enqueuer: pointsEnqueuer,
	}
}
