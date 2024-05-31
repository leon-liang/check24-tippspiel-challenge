package http

import (
	"github.com/labstack/echo/v4"
	authMiddleware "github.com/leon-liang/check24-tippspiel-challenge/server/router/middleware"
)

func (h *Handler) Register(v1 *echo.Group) {
	users := v1.Group("/users")
	users.GET("/me", h.GetCurrentUser)

	communities := v1.Group("/communities")
	communities.POST("", h.CreateCommunity)
	communities.GET("", h.GetUserCommunities)
	communities.DELETE("/:community_id", h.DeleteCommunity)
	communities.POST("/:community_id/join", h.JoinCommunity)
	communities.PUT("/:community_id/leave", h.LeaveCommunity)
	communities.GET("/:community_id/leaderboard", h.GetCommunityLeaderboard)
	communities.GET("/:community_id/members", h.PaginateCommunityMembers)
	communities.GET("/preview", h.GetUserCommunitiesPreview)
	communities.GET("/:community_id/pinned_users", h.GetPinnedUsers)
	communities.PUT("/:community_id/pinned_users/:user_id", h.AddPinnedUser)
	communities.DELETE("/:community_id/pinned_users/:user_id", h.RemovePinnedUser)

	matches := v1.Group("/matches")
	matches.GET("", h.GetMatches)

	matches.Use(authMiddleware.ValidatePermissions([]string{"admin:full"}))
	matches.PUT("/:match_id", h.UpdateMatch)

	bets := v1.Group("/bets")
	bets.GET("", h.GetBets)
	bets.PUT("/:bet_id", h.UpdateBet)

	points := v1.Group("/points")
	points.Use(authMiddleware.ValidatePermissions([]string{"admin:full"}))
	points.PUT("", h.CalculatePoints)

	jobs := v1.Group("/jobs")
	jobs.Use(authMiddleware.ValidatePermissions([]string{"admin:full"}))
	jobs.GET("/:job_name", h.GetJob)
}
