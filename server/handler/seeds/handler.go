package seeds

import "github.com/leon-liang/check24-tippspiel-challenge/server/store"

type Handler struct {
	MatchStore     store.MatchStore
	TeamStore      store.TeamStore
	CommunityStore store.CommunityStore
	UserStore      store.UserStore
	JobStore       store.JobStore
}

func NewHandler(ms store.MatchStore, ts store.TeamStore, cs store.CommunityStore, us store.UserStore, js store.JobStore) *Handler {
	return &Handler{
		MatchStore:     ms,
		TeamStore:      ts,
		CommunityStore: cs,
		UserStore:      us,
		JobStore:       js,
	}
}
