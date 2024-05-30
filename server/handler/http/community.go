package http

import (
	"cmp"
	"errors"
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/dtos"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"net/http"
	"slices"
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
	currentUser := ctx.Get("current_user").(*model.User)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NewError(err))
	}

	// Check if the user is already a member of the community
	isMember, err := h.CommunityStore.IsMember(currentUser, community)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if isMember {
		return ctx.JSON(http.StatusInternalServerError, "user is already a member of the community")
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

// GetUserCommunitiesPreview godoc
// @Tags Communities
// @Summary Get preview of a user's communities
// @Produce json
// @Success 200 {object} http.userCommunitiesLeaderboardResponse
// @Router /v1/communities/preview [GET]
// @Security OAuth2Implicit
func (h *Handler) GetUserCommunitiesPreview(ctx echo.Context) error {
	currentUser := ctx.Get("current_user").(*model.User)

	communities, err := h.CommunityStore.GetUserCommunities(currentUser)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	communityPreviews := make([]*communityLeaderboardResponse, 0)

	for _, community := range communities {
		// If there are <= 7 users in the community return all members
		count, err := h.CommunityStore.GetCommunityMembersCount(&community)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		if count <= 7 {
			members, err := h.CommunityStore.GetCommunityMembers(&community)
			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}

			communityPreview := newCommunityLeaderboardResponse(&community, members)
			communityPreviews = append(communityPreviews, communityPreview)
			continue
		}

		// Get position of current user
		pos, err := h.CommunityStore.GetUserPosition(currentUser, &community)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		// If current user is in the top 4 positions:
		// Return top 6 positions + last position
		if pos <= 4 {
			topSix, err := h.CommunityStore.GetMembersAtPosition(&community, 1, 6)
			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}
			last, err := h.CommunityStore.GetMembersAtPosition(&community, count, count)
			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}

			members := append(topSix, last...)
			communityPreview := newCommunityLeaderboardResponse(&community, members)
			communityPreviews = append(communityPreviews, communityPreview)
			continue
		}

		// If current user is in the last 2 positions:
		// Return last 4 positions + top 3 positions
		if count-pos < 2 {
			topThree, err := h.CommunityStore.GetMembersAtPosition(&community, 1, 3)
			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}
			lastFour, err := h.CommunityStore.GetMembersAtPosition(&community, count-3, count)
			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}

			members := append(topThree, lastFour...)
			communityPreview := newCommunityLeaderboardResponse(&community, members)
			communityPreviews = append(communityPreviews, communityPreview)
			continue
		}

		// Otherwise:
		// Return top 3 positions, n-1, n (current user position), n+1 and last position
		topThree, err := h.CommunityStore.GetMembersAtPosition(&community, 1, 3)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		adjacentToUser, err := h.CommunityStore.GetMembersAtPosition(&community, pos-1, pos+1)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		last, err := h.CommunityStore.GetMembersAtPosition(&community, count, count)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		members := append(topThree, adjacentToUser...)
		members = append(members, last...)

		communityPreview := newCommunityLeaderboardResponse(&community, members)
		communityPreviews = append(communityPreviews, communityPreview)
	}

	response := newUserCommunitiesLeaderboardResponse(communityPreviews)
	return ctx.JSON(http.StatusOK, response)
}

// GetCommunityLeaderboard godoc
// @Tags Communities
// @Summary Get the leaderboard for a specified community
// @Produce json
// @Success 200 {object} http.communityLeaderboardResponse
// @Param community_id path string true "Community ID"
// @Router /v1/communities/{community_id}/leaderboard [GET]
// @Security OAuth2Implicit
func (h *Handler) GetCommunityLeaderboard(ctx echo.Context) error {
	communityId := ctx.Param("community_id")
	currentUser := ctx.Get("current_user").(*model.User)

	community, err := h.CommunityStore.GetCommunityById(communityId)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if community == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	// check that current user is a member of the community
	isMember, err := h.CommunityStore.IsMember(currentUser, community)
	if err != nil {
		return ctx.JSON(http.StatusOK, utils.NewError(err))
	}

	if !isMember {
		return ctx.JSON(http.StatusForbidden, utils.AccessForbidden())
	}

	// get top 3 positions
	topThree, err := h.CommunityStore.GetMembersAtPosition(community, 1, 3)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	// get all pinned users
	pinnedMembers := make([]*dtos.Member, 0)
	pinnedUsers, err := h.UserCommunityStore.GetPinnedUsers(currentUser, community)

	for _, user := range pinnedUsers {
		pos, err := h.CommunityStore.GetUserPosition(&user, community)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		member, err := h.CommunityStore.GetMembersAtPosition(community, pos, pos)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		pinnedMembers = append(pinnedMembers, member...)
	}

	// get position of the current user
	pos, err := h.CommunityStore.GetUserPosition(currentUser, community)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	member, err := h.CommunityStore.GetMembersAtPosition(community, pos, pos)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	// get last user
	count, err := h.CommunityStore.GetCommunityMembersCount(community)
	last, err := h.CommunityStore.GetMembersAtPosition(community, count, count)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	members := append(topThree, pinnedMembers...)
	members = append(members, member...)
	members = append(members, last...)

	// remove duplicates and sort members
	members = utils.Unique(members)

	slices.SortFunc(members, func(a, b *dtos.Member) int {
		return cmp.Compare(a.Position, b.Position)
	})

	response := newCommunityLeaderboardResponse(community, members)
	return ctx.JSON(http.StatusOK, response)
}
