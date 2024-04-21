package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"net/http"
)

// GetCurrentUser godoc
// @Tags Users
// @Summary Get current user
// @Produce json
// @Success 200 {object} handler.userResponse
// @Router /v1/users/me [GET]
//
// @Security OAuth2Implicit
func (h *Handler) GetCurrentUser(c echo.Context) error {
	currentUser := c.Get("current_user").(*model.User)
	response := newUserResponse(currentUser)

	return c.JSON(http.StatusOK, &response)
}
