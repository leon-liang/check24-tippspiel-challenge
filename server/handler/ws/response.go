package ws

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
)

type Team struct {
	Name   *string `json:"name"`
	Result *int    `json:"result"`
}

type matchResponse struct {
	Match struct {
		ID       string `json:"id"`
		HomeTeam Team   `json:"homeTeam"`
		AwayTeam Team   `json:"awayTeam"`
	} `json:"match"`
}

func newMatchResponse(match model.Match) *matchResponse {
	r := new(matchResponse)
	ht := Team{}
	at := Team{}

	if match.HomeTeam != nil {
		ht.Name = &match.HomeTeam.Name
		ht.Result = match.HomeTeamResult
	}

	if match.AwayTeam != nil {
		at.Name = &match.AwayTeam.Name
		at.Result = match.AwayTeamResult
	}

	r.Match.ID = match.ID
	r.Match.HomeTeam = ht
	r.Match.AwayTeam = at

	return r
}
