package ws

import (
	"bytes"
	"context"
	"encoding/gob"
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/kafka"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
)

func (h *Handler) wsMatches(ctx echo.Context) error {
	ws, err := h.Upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		fmt.Println(err)
	}
	defer ws.Close()

	reader := kafka.NewReader("matches")
	reader.SetOffset(-1)
	defer reader.Close()

	ws.SetCloseHandler(func(code int, text string) error {
		reader.Close()
		fmt.Println("Received connection close request. Closing connection...")
		return nil
	})

	for {
		message, err := reader.ReadMessage(context.Background())
		if err != nil {
			fmt.Println("Error: ", err)
		}

		// decode message
		var m model.Match
		buf := bytes.NewBuffer(message.Value)
		decoder := gob.NewDecoder(buf)

		if err := decoder.Decode(&m); err != nil {
			fmt.Println("Error decoding gob: ", err)
		}

		r := newMatchResponse(m)
		b, _ := json.Marshal(r)

		if err := ws.WriteMessage(websocket.TextMessage, b); err != nil {
			fmt.Println(err)
		}
	}

}
