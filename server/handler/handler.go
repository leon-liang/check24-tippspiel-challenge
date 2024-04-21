package handler

import "github.com/leon-liang/check24-tippspiel-challenge/server/store"

type Handler struct {
	UserStore store.UserStore
}

func NewHandler(us store.UserStore) *Handler {
	return &Handler{
		UserStore: us,
	}
}
