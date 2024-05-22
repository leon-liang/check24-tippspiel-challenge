package http

import (
	"fmt"
	"github.com/gocraft/work"
	"github.com/labstack/echo/v4"
	"net/http"
)

// CalculatePoints godoc
// @Tags Points
// @Summary Calculate points based on the current of the current match scores and bets
// @Produce json
// @Success 200 {object} http.calculatePointsResponse
// @Router /v1/points [PUT]
// @Security OAuth2Implicit
func (h *Handler) CalculatePoints(ctx echo.Context) error {
	fmt.Println("Queuing calculate points")
	_, err := h.PointsEnqueuer.Enqueuer.Enqueue("calculate_points", work.Q{"name": "Leon"})
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err)
	}

	// return websocket url to connect to for task updates
	return nil
}
