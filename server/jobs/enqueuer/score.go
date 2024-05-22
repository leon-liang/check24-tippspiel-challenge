package enqueuer

import "github.com/gocraft/work"

type ScoreEnqueuer struct {
	Enqueuer *work.Enqueuer
}

func NewScoreEnqueuer() *ScoreEnqueuer {
	scoreEnqueuer := NewEnqueuer("calculate_points", 5)

	return &ScoreEnqueuer{
		Enqueuer: scoreEnqueuer,
	}
}
