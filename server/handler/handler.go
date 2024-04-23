package handler

import "github.com/leon-liang/check24-tippspiel-challenge/server/store"

type Handler struct {
	UserStore      store.UserStore
	CommunityStore store.CommunityStore
}

func NewHandler(us store.UserStore, cs store.CommunityStore) *Handler {
	return &Handler{
		UserStore:      us,
		CommunityStore: cs,
	}
}
