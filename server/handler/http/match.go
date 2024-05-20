package http

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"net/http"
)

// GetMatches godoc
// @Tags Matches
// @Summary Retrieve all matches
// @Produce json
// @Success 200 {object} http.matchesResponse
// @Router /v1/matches [GET]
// @Security OAuth2Implicit
func (h *Handler) GetMatches(ctx echo.Context) error {
	matches, err := h.MatchStore.GetMatches()

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	response := newMatchesResponse(matches)
	return ctx.JSON(http.StatusOK, &response)
}

// UpdateMatch godoc
// @Tags Matches
// @Summary Update match
// @Accept json
// @Produce json
// @Success 200 {object} http.matchResponse
// @Param match_id path string true "Match ID"
// @Router /v1/matches/{match_id} [PUT]
// @Param data body http.matchUpdateRequest true "Update Match"
// @Security OAuth2Implicit
func (h *Handler) UpdateMatch(ctx echo.Context) error {
	matchId := ctx.Param("match_id")
	m, err := h.MatchStore.GetMatchById(matchId)

	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if m == nil {
		return ctx.JSON(http.StatusNotFound, utils.AccessForbidden())
	}

	req := newMatchUpdateRequest()

	if err := req.bind(ctx, m); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, utils.NewError(err))
	}

	if *req.Match.HomeTeam.Name == "" {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	homeTeam, err := h.TeamStore.GetTeamByName(*req.Match.HomeTeam.Name)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if homeTeam == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	if *req.Match.AwayTeam.Name == "" {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	awayTeam, err := h.TeamStore.GetTeamByName(*req.Match.AwayTeam.Name)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}
	if awayTeam == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	if err := h.MatchStore.UpdateMatchTeams(m, homeTeam, awayTeam); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if err := h.MatchStore.UpdateMatchResults(m, req.Match.HomeTeam.Result, req.Match.AwayTeam.Result); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	h.MatchWriter.WriteMatches(m)

	return ctx.JSON(http.StatusOK, newMatchResponse(*m))
}
