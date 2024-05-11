package http

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
)

type communityCreateRequest struct {
	Community struct {
		Name string `json:"name"`
	} `json:"community"`
}

func newCommunityCreateRequest() *communityCreateRequest {
	return new(communityCreateRequest)
}

func (r *communityCreateRequest) bind(ctx echo.Context, c *model.Community) error {
	if err := ctx.Bind(r); err != nil {
		return err
	}

	if err := ctx.Validate(r); err != nil {
		return err
	}

	currentUser := ctx.Get("current_user").(*model.User)

	c.Name = r.Community.Name
	c.Owner = currentUser.ID

	return nil
}

type betUpdateRequest struct {
	Bet struct {
		HomeTeam *int `json:"homeTeam" validate:"required"`
		AwayTeam *int `json:"awayTeam" validate:"required"`
	} `json:"bet"`
}

func newBetUpdateRequest() *betUpdateRequest {
	return new(betUpdateRequest)
}

func (r *betUpdateRequest) bind(ctx echo.Context, b *model.Bet) error {
	if err := ctx.Bind(r); err != nil {
		return err
	}

	if err := ctx.Validate(r); err != nil {
		return err
	}

	b.HomeTeam = r.Bet.HomeTeam
	b.AwayTeam = r.Bet.AwayTeam

	return nil
}
