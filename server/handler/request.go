package handler

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
