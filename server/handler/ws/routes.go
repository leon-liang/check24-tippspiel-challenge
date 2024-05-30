package ws

import "github.com/labstack/echo/v4"

func (h *Handler) Register(ws *echo.Group) {
	matches := ws.Group("/matches")
	matches.GET("", h.wsMatches)

	jobs := ws.Group("/jobs")
	jobs.GET("/:job_name/status", h.wsJobs)

	points := ws.Group("/points")
	points.GET("/status", h.wsPoints)
}
