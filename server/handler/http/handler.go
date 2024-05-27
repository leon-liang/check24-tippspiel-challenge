package http

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/jobs/enqueuer"
	"github.com/leon-liang/check24-tippspiel-challenge/server/mq"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
)

type Handler struct {
	UserStore          store.UserStore
	CommunityStore     store.CommunityStore
	UserCommunityStore store.UserCommunityStore
	MatchStore         store.MatchStore
	TeamStore          store.TeamStore
	BetStore           store.BetStore
	JobStore           store.JobStore
	MatchWriter        mq.MatchWriter
	PointsEnqueuer     enqueuer.PointsEnqueuer
}

func NewHandler(us store.UserStore, cs store.CommunityStore, ucs store.UserCommunityStore, ms store.MatchStore, ts store.TeamStore, bs store.BetStore, js store.JobStore, mw mq.MatchWriter, pe enqueuer.PointsEnqueuer) *Handler {
	return &Handler{
		UserStore:          us,
		CommunityStore:     cs,
		UserCommunityStore: ucs,
		MatchStore:         ms,
		TeamStore:          ts,
		BetStore:           bs,
		JobStore:           js,
		MatchWriter:        mw,
		PointsEnqueuer:     pe,
	}
}
