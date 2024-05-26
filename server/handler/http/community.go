package http

import (
	"errors"
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
// @Success 200 {object} http.communityResponse
// @Router /v1/communities [POST]
// @Param data body http.communityCreateRequest true "Create Community"
// @Security OAuth2Implicit
func (h *Handler) CreateCommunity(ctx echo.Context) error {
	// User can be part of at most 5 communities
	currentUser := ctx.Get("current_user").(*model.User)
	communities, err := h.CommunityStore.GetUserCommunities(currentUser)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if len(communities) >= 5 {
		return ctx.JSON(http.StatusForbidden, utils.NewError(errors.New("user can be part of at most 5 communities")))
	}

	var c model.Community

	req := newCommunityCreateRequest()
	if err := req.bind(ctx, &c); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	c.Owner = currentUser.ID
	c.Name = req.Community.Name

	if err := h.CommunityStore.Create(&c); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	response := newCommunityResponse(&c)
	return ctx.JSON(http.StatusOK, &response)
}

// GetCommunity godoc
// @Tags Communities
// @Summary Retrieve a community with the given id
// @Produce json
// @Success 200 {object} http.communityResponse
// @Param community_id path string true "Community ID"
// @Router /v1/communities/{community_id} [GET]
// @Security OAuth2Implicit
func (h *Handler) GetCommunity(ctx echo.Context) error {
	communityId := ctx.Param("community_id")

	community, err := h.CommunityStore.GetCommunityById(communityId)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, utils.NewError(err))
	}

	response := newCommunityResponse(community)
	return ctx.JSON(http.StatusOK, &response)
}

// GetUserCommunities godoc
// @Tags Communities
// @Summary Retrieve all communities the current user is part of
// @Produce json
// @Success 200 {object} http.communitiesResponse
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

// JoinCommunity godoc
// @Tags Communities
// @Summary Join the specified community
// @Produce json
// @Success 200 {object} http.communityResponse
// @Param community_id path string true "Community ID"
// @Router /v1/communities/{community_id}/join [POST]
// @Security OAuth2Implicit
func (h *Handler) JoinCommunity(ctx echo.Context) error {
	communityId := ctx.Param("community_id")
	community, err := h.CommunityStore.GetCommunityById(communityId)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NewError(err))
	}

	members, err := h.CommunityStore.GetCommunityMembers(community)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	currentUser := ctx.Get("current_user").(*model.User)

	// Check if the user is already a member of the community
	for _, member := range members {
		if member.ID == currentUser.ID {
			return ctx.JSON(http.StatusInternalServerError, "user is already a member of the community")
		}
	}

	// Check if the user is the owner of the community
	if currentUser.ID == community.Owner {
		return ctx.JSON(http.StatusInternalServerError, "user is owner of the community")
	}

	// User can be part of at most 5 communities
	communities, err := h.CommunityStore.GetUserCommunities(currentUser)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if len(communities) >= 5 {
		return ctx.JSON(http.StatusForbidden, utils.NewError(errors.New("user can be part of at most 5 communities")))
	}

	if err := h.CommunityStore.Join(currentUser, community); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newCommunityResponse(community)
	return ctx.JSON(http.StatusOK, &response)
}

// LeaveCommunity godoc
// @Tags Communities
// @Summary Leave the specified community
// @Produce json
// @Success 200 {object} http.communityResponse
// @Param community_id path string true "Community ID"
// @Router /v1/communities/{community_id}/leave [PUT]
// @Security OAuth2Implicit
func (h *Handler) LeaveCommunity(ctx echo.Context) error {
	communityId := ctx.Param("community_id")
	currentUser := ctx.Get("current_user").(*model.User)

	community, err := h.CommunityStore.GetCommunityById(communityId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	if err := h.CommunityStore.Leave(currentUser, community); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newCommunityResponse(community)
	return ctx.JSON(http.StatusOK, &response)
}

// DeleteCommunity godoc
// @Tags Communities
// @Summary Delete the specified community
// @Produce json
// @Success 200 {object} http.communityResponse
// @Param community_id path string true "Community ID"
// @Router /v1/communities/{community_id} [DELETE]
// @Security OAuth2Implicit
func (h *Handler) DeleteCommunity(ctx echo.Context) error {
	communityId := ctx.Param("community_id")
	currentUser := ctx.Get("current_user").(*model.User)

	community, err := h.CommunityStore.GetCommunityById(communityId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	// Verify that the user is the owner of the community
	if currentUser.ID != community.Owner {
		return ctx.JSON(http.StatusForbidden, utils.AccessForbidden())
	}

	if err := h.CommunityStore.Delete(currentUser, community); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newCommunityResponse(community)
	return ctx.JSON(http.StatusOK, &response)
}

// GetCommunityMembers godoc
// @Tags Communities
// @Summary Retrieve all users that are part of a community
// @Produce json
// @Success 200 {object} http.communitiesResponse
// @Param community_id path string true "Community ID"
// @Router /v1/communities/{community_id}/members [GET]
// @Security OAuth2Implicit
func (h *Handler) GetCommunityMembers(ctx echo.Context) error {
	communityId := ctx.Param("community_id")

	community, err := h.CommunityStore.GetCommunityById(communityId)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NewError(err))
	}

	users, err := h.CommunityStore.GetCommunityMembers(community)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newUsersResponse(users)
	return ctx.JSON(http.StatusOK, &response)
}

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

	if err := h.CommunityStore.AddPinnedUser(currentUser, user, community); err != nil {
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

	if err := h.CommunityStore.DeletePinnedUser(currentUser, user, community); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	response := newCommunityResponse(community)
	return ctx.JSON(http.StatusOK, &response)
}
