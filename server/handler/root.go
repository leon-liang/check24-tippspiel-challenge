package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"net/http"
)

// GetRoot godoc
//
//	@Summary Get Root
//	@Produce json
//	@Success 200 {object} model.RootResponse
//	@Router / [get]
func (h *Handler) GetRoot(c echo.Context) error {
	var response model.RootResponse
	response.Message = "Hello World!"
	return c.JSON(http.StatusOK, &response)
}
