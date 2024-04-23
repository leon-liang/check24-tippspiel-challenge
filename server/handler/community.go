package handler

import (
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

	c.Name = req.Community.Name

	err := h.CommunityStore.Create(&c)
	if err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	response := newCommunityResponse(&c)
	return ctx.JSON(http.StatusOK, &response)
}

// GetUserCommunities godoc
// @Tags Communities
// @Summary Retrieve all communities the current user is part of
// @Produce json
// @Success 200 {object} handler.communitiesResponse
// @Router /v1/communities [GET]
// @Security OAuth2Implicit
func (h *Handler) GetUserCommunities(ctx echo.Context) error {
	currentUser := ctx.Get("current_user").(*model.User)

	communities, err := h.CommunityStore.GetUserCommunities(currentUser)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newCommunitiesResponse(communities)
	return ctx.JSON(http.StatusOK, &response)
}
