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

func (h *Handler) wsJobs(ctx echo.Context) error {
	jobName := ctx.Param("job_name")

	ws, err := h.Upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		fmt.Println(err)
	}
	defer ws.Close()

	reader := kafka.NewReader("jobs")
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
		var j model.Job
		if string(message.Key) == jobName {
			// decode message
			buf := bytes.NewBuffer(message.Value)
			decoder := gob.NewDecoder(buf)

			if err := decoder.Decode(&j); err != nil {
				fmt.Println("Error decoding gob: ", err)
			}

			r := newJobResponse(j)
			b, err := json.Marshal(r)
			if err != nil {
				fmt.Println("Error encoding JSON", err)
			}

			if err := ws.WriteMessage(websocket.TextMessage, b); err != nil {
				fmt.Println(err)
			}

			if j.Completed == j.Outstanding {
				ws.Close()
			}
		}
	}
}
