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
	communities.GET("/:community_id", h.GetCommunity)
	communities.POST("/:community_id/join", h.JoinCommunity)
	communities.GET("/:community_id/members", h.GetCommunityMembers)

	matches := v1.Group("/matches")
	matches.GET("", h.GetMatches)

	matches.Use(authMiddleware.ValidatePermissions([]string{"admin:full"}))
	matches.POST("/teams", h.UpdateMatchTeams)

	bets := v1.Group("/bets")
	bets.GET("", h.GetBets)
	bets.PUT("/:bet_id", h.UpdateBet)
}
