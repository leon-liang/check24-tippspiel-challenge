package http

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/mq"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
)

type Handler struct {
	UserStore      store.UserStore
	CommunityStore store.CommunityStore
	MatchStore     store.MatchStore
	TeamStore      store.TeamStore
	BetStore       store.BetStore
	BetWriter      mq.BetWriter
}

func NewHandler(us store.UserStore, cs store.CommunityStore, ms store.MatchStore, ts store.TeamStore, bs store.BetStore, bw mq.BetWriter) *Handler {
	return &Handler{
		UserStore:      us,
		CommunityStore: cs,
		MatchStore:     ms,
		TeamStore:      ts,
		BetStore:       bs,
		BetWriter:      bw,
	}
}
