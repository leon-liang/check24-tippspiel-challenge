package model

import "gorm.io/gorm"

type Bet struct {
	gorm.Model
	ID       string `gorm:"type:uuid;default:gen_random_uuid()"`
	Bettor   string
	MatchID  string
	Match    Match
	HomeTeam *int
	AwayTeam *int
}
