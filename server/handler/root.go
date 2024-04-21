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
// @Router / [get]
func (h *Handler) GetRoot(c echo.Context) error {
	var response = newRootResponse("Hello World!")
	return c.JSON(http.StatusOK, &response)
}
