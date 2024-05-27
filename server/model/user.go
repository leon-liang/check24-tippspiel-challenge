package model

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	ID                 string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Username           string `gorm:"unique_index;not null"`
	Email              string `gorm:"unique_index;not null"`
	FirstName          string
	LastName           string
	CreatedAt          time.Time
	CreatedCommunities []Community `gorm:"foreignKey:Owner"`
	JoinedCommunities  []Community `gorm:"many2many:user_community;"`
	Bets               []Bet       `gorm:"foreignKey:Bettor"`
	Points             int         `gorm:"default:0"`
}
