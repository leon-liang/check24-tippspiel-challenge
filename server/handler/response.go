package handler

import "github.com/leon-liang/check24-tippspiel-challenge/server/model"

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
