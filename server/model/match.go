package model

import (
	"gorm.io/gorm"
	"time"
)

type Match struct {
	gorm.Model
	ID              string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	HomeTeamID      *string
	HomeTeam        *Team
	AwayTeamID      *string
	AwayTeam        *Team
	HomeTeamResult  *int
	AwayTeamResult  *int
	GameTime        time.Time
	ResultUpdatedAt time.Time `gorm:"default:current_timestamp"`
}
