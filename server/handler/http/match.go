package http

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"net/http"
)

// GetMatches godoc
// @Tags Matches
// @Summary Retrieve all matches
// @Produce json
// @Success 200 {object} http.matchesResponse
// @Router /v1/matches [GET]
func (h *Handler) GetMatches(ctx echo.Context) error {
	matches, err := h.MatchStore.GetMatches()

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newMatchesResponse(matches)
	return ctx.JSON(http.StatusOK, &response)
}

func (h *Handler) UpdateMatchTeams(ctx echo.Context) error {
	var match model.Match

	response := newMatchResponse(match)
	return ctx.JSON(http.StatusOK, &response)
}

//func (h *Handler) UpdateMatchResults(ctx echo.Context) error {
//	return ctx.JSON(http.StatusOK, &response)
//}
