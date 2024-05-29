package http

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"net/http"
)

// AddPinnedUser godoc
// @Tags Communities
// @Summary Add specified user to the pinned users for a given community
// @Produce json
// @Success 200 {object} http.communityResponse
// @Param community_id path string true "Community ID"
// @Param user_id path string true "User ID"
// @Router /v1/communities/{community_id}/pinned_users/{user_id} [PUT]
// @Security OAuth2Implicit
func (h *Handler) AddPinnedUser(ctx echo.Context) error {
	communityId := ctx.Param("community_id")
	userId := ctx.Param("user_id")
	currentUser := ctx.Get("current_user").(*model.User)

	community, err := h.CommunityStore.GetCommunityById(communityId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	user, err := h.UserStore.GetById(userId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if user == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	if err := h.UserCommunityStore.AddPinnedUser(currentUser, user, community); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newCommunityResponse(community)
	return ctx.JSON(http.StatusOK, &response)
}

// RemovePinnedUser godoc
// @Tags Communities
// @Summary Remove specified user from the pinned users for a given community
// @Produce json
// @Success 200 {object} http.communityResponse
// @Param community_id path string true "Community ID"
// @Param user_id path string true "User ID"
// @Router /v1/communities/{community_id}/pinned_users/{user_id} [DELETE]
// @Security OAuth2Implicit
func (h *Handler) RemovePinnedUser(ctx echo.Context) error {
	communityId := ctx.Param("community_id")
	userId := ctx.Param("user_id")
	currentUser := ctx.Get("current_user").(*model.User)

	community, err := h.CommunityStore.GetCommunityById(communityId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	user, err := h.UserStore.GetById(userId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if user == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	if err := h.UserCommunityStore.DeletePinnedUser(currentUser, user, community); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	response := newCommunityResponse(community)
	return ctx.JSON(http.StatusOK, &response)
}
