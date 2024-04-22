package handler

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"net/http"
)

// CreateCommunity godoc
// @Tags Communities
// @Summary Create a new community
// @Accept json
// @Produce json
// @Success 200 {object} handler.communityResponse
// @Router /v1/communities [POST]
// @Param data body handler.communityCreateRequest true "Create Community"
// @Security OAuth2Implicit
func (h *Handler) CreateCommunity(ctx echo.Context) error {
	var c model.Community

	req := &communityCreateRequest{}
	if err := req.bind(ctx, &c); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	fmt.Println(req.Community.Name)

	c.Name = req.Community.Name

	err := h.CommunityStore.Create(&c)
	if err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	response := newCommunityResponse(&c)
	return ctx.JSON(http.StatusOK, &response)
}
