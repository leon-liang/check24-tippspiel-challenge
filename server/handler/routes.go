package handler

import (
	"github.com/labstack/echo/v4"
)

func (h *Handler) Register(v1 *echo.Group) {
	root := v1.Group("")
	root.GET("", h.GetRoot)
}
