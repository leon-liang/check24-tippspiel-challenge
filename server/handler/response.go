package handler

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
)

type rootResponse struct {
	Message string `json:"message"`
}

func newRootResponse(message string) *rootResponse {
	r := new(rootResponse)
	r.Message = message

	return r
}

type userResponse struct {
	User struct {
		ID        string `json:"id"`
		Username  string `json:"username"`
		Email     string `json:"email"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
	} `json:"user"`
}

func newUserResponse(u *model.User) *userResponse {
	r := new(userResponse)
	r.User.ID = u.ID
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.FirstName = u.FirstName
	r.User.LastName = u.LastName

	return r
}

type communityResponse struct {
	Community struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	} `json:"community"`
}

func newCommunityResponse(c *model.Community) *communityResponse {
	r := new(communityResponse)
	r.Community.ID = c.ID
	r.Community.Name = c.Name

	return r
}

type communitiesResponse struct {
	Communities []communityResponse `json:"communities"`
}

func newCommunitiesResponse(communities []model.Community) *communitiesResponse {
	r := new(communitiesResponse)
	cr := communityResponse{}

	r.Communities = make([]communityResponse, 0)
	for _, c := range communities {
		cr.Community.ID = c.ID
		cr.Community.Name = c.Name

		r.Communities = append(r.Communities, cr)
	}

	return r
}
