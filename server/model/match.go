package model

import (
	"gorm.io/gorm"
	"time"
)

type Match struct {
	gorm.Model
	ID         string `gorm:"type:uuid;default:gen_random_uuid()"`
	HomeTeamID *string
	HomeTeam   *Team
	AwayTeamID *string
	AwayTeam   *Team
	GameTime   time.Time
}
