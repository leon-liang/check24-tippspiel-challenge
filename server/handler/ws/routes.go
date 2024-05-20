package ws

import "github.com/labstack/echo/v4"

func (h *Handler) Register(ws *echo.Group) {
	matches := ws.Group("/matches")
	matches.GET("", h.wsMatches)
}
