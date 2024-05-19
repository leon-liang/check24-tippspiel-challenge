package ws

import (
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
	"time"
)

func (h *Handler) wsMatches(ctx echo.Context) error {
	ws, err := h.Upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		fmt.Println(err)
	}

	for i := 0; i < 3; i++ {
		err := ws.WriteMessage(websocket.TextMessage, []byte("Hello, Client!"))
		if err != nil {
			fmt.Println(err)
		}

		time.Sleep(5 * time.Second)
	}

	return ws.Close()
}
