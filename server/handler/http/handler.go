package http

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/jobs/enqueuer"
	"github.com/leon-liang/check24-tippspiel-challenge/server/mq"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
)

type Handler struct {
	UserStore      store.UserStore
	CommunityStore store.CommunityStore
	MatchStore     store.MatchStore
	TeamStore      store.TeamStore
	BetStore       store.BetStore
	MatchWriter    mq.MatchWriter
	ScoreEnqueuer  enqueuer.ScoreEnqueuer
}

func NewHandler(us store.UserStore, cs store.CommunityStore, ms store.MatchStore, ts store.TeamStore, bs store.BetStore, mw mq.MatchWriter, se enqueuer.ScoreEnqueuer) *Handler {
	return &Handler{
		UserStore:      us,
		CommunityStore: cs,
		MatchStore:     ms,
		TeamStore:      ts,
		BetStore:       bs,
		MatchWriter:    mw,
		ScoreEnqueuer:  se,
	}
}
