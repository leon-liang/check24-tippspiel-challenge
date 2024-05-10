package http

import "github.com/leon-liang/check24-tippspiel-challenge/server/store"

type Handler struct {
	UserStore      store.UserStore
	CommunityStore store.CommunityStore
	MatchStore     store.MatchStore
	TeamStore      store.TeamStore
}

func NewHandler(us store.UserStore, cs store.CommunityStore, ms store.MatchStore, ts store.TeamStore) *Handler {
	return &Handler{
		UserStore:      us,
		CommunityStore: cs,
		MatchStore:     ms,
		TeamStore:      ts,
	}
}
