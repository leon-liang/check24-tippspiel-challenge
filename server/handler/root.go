package handler

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

// GetRoot godoc
// @Tags Root
// @Summary Example
// @Produce json
// @Success 200 {object} handler.rootResponse
// @Router / [GET]
func (h *Handler) GetRoot(ctx echo.Context) error {
	var response = newRootResponse("Hello World!")
	return ctx.JSON(http.StatusOK, &response)
}
