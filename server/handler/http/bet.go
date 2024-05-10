package http

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"net/http"
)

// GetBets godoc
// @Tags Bets
// @Summary Retrieve all bets from the current user
// @Produce json
// @Success 200 {object} http.betsResponse
// @Router /v1/bets [GET]
// @Security OAuth2Implicit
func (h *Handler) GetBets(ctx echo.Context) error {
	currentUser := ctx.Get("current_user").(*model.User)

	bets, err := h.BetStore.GetBets(currentUser)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if len(bets) == 0 {
		matches, err := h.MatchStore.GetMatches()
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		for _, match := range matches {
			var bet model.Bet

			bet.Match = match
			bet.Bettor = currentUser.ID
			if err := h.BetStore.Create(&bet); err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}

			bets = append(bets, bet)
		}
	}

	var populatedBets []model.Bet

	for _, bet := range bets {
		populatedMatch, err := h.MatchStore.GetMatchById(bet.MatchID)
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}
		bet.Match = *populatedMatch
		populatedBets = append(populatedBets, bet)
	}

	response := newBetsResponse(populatedBets)
	return ctx.JSON(http.StatusOK, &response)
}
