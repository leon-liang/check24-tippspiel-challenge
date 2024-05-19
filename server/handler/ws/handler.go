package ws

import (
	"github.com/gorilla/websocket"
	"github.com/leon-liang/check24-tippspiel-challenge/server/mq"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
)

type Handler struct {
	Upgrader   websocket.Upgrader
	MatchStore store.MatchStore
	MatchMQ    mq.MatchMQ
}

func NewHandler(upgrader websocket.Upgrader, ms store.MatchStore, mmq mq.MatchMQ) *Handler {
	return &Handler{
		Upgrader:   upgrader,
		MatchStore: ms,
		MatchMQ:    mmq,
	}
}
