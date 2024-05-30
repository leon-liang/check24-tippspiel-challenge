package ws

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"time"
)

type matchResponse struct {
	Message struct {
		MatchID   string    `json:"matchId"`
		Status    string    `json:"status"`
		UpdatedAt time.Time `json:"updatedAt"`
	} `json:"message"`
}

func newMatchResponse(match model.Match, message string) *matchResponse {
	r := new(matchResponse)
	r.Message.MatchID = match.ID
	r.Message.Status = message
	r.Message.UpdatedAt = time.Now()
	return r
}

type jobResponse struct {
	Job struct {
		Name        string `json:"name"`
		Outstanding int    `json:"outstanding"`
		Completed   int    `json:"completed"`
	} `json:"job"`
}

func newJobResponse(job model.Job) *jobResponse {
	r := new(jobResponse)

	r.Job.Name = job.Name
	r.Job.Outstanding = job.Outstanding
	r.Job.Completed = job.Completed

	return r
}

type pointsResponse struct {
	Message struct {
		Status    string    `json:"status"`
		UpdatedAt time.Time `json:"updatedAt"`
	} `json:"message"`
}

func newPointsResponse(status string) *pointsResponse {
	r := new(pointsResponse)
	r.Message.Status = status
	r.Message.UpdatedAt = time.Now()
	return r
}
