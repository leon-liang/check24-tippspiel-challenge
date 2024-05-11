package seeds

import "github.com/leon-liang/check24-tippspiel-challenge/server/store"

type Handler struct {
	MatchStore store.MatchStore
	TeamStore  store.TeamStore
}

func NewHandler(ms store.MatchStore, ts store.TeamStore) *Handler {
	return &Handler{
		MatchStore: ms,
		TeamStore:  ts,
	}
}
