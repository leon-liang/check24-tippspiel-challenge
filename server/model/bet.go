package model

import "gorm.io/gorm"

type Bet struct {
	gorm.Model
	ID         string `gorm:"type:uuid;default:gen_random_uuid()"`
	Bettor     string
	MatchID    int
	Match      Match
	HomeTeamID string
	HomeTeam   Team
	AwayTeamID string
	AwayTeam   Team
}
