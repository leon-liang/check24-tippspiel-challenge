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

			populatedMatch, err := h.MatchStore.GetMatchById(match.ID)

			if err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}

			bet.Match = *populatedMatch
			bet.Bettor = currentUser.ID
			if err := h.BetStore.Create(&bet); err != nil {
				return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
			}

			bets = append(bets, bet)
		}
	}

	response := newBetsResponse(bets)
	return ctx.JSON(http.StatusOK, &response)
}
