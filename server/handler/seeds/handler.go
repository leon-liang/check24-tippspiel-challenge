package seeds

import "github.com/leon-liang/check24-tippspiel-challenge/server/store"

type Handler struct {
	MatchStore store.MatchStore
	TeamStore  store.TeamStore
	JobStore   store.JobStore
}

func NewHandler(ms store.MatchStore, ts store.TeamStore, js store.JobStore) *Handler {
	return &Handler{
		MatchStore: ms,
		TeamStore:  ts,
		JobStore:   js,
	}
}
