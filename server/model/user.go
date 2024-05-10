package model

import (
	"gorm.io/gorm"
	"time"
)

type User struct {
	gorm.Model
	ID                 string `gorm:"type:uuid;default:gen_random_uuid()"`
	Username           string `gorm:"unique_index;not null"`
	Email              string `gorm:"unique_index;not null"`
	FirstName          string
	LastName           string
	CreatedAt          time.Time
	CreatedCommunities []Community `gorm:"foreignKey:Owner"`
	JoinedCommunities  []Community `gorm:"many2many:user_community;"`
	Bets               []Bet       `gorm:"foreignKey:Bettor"`
}

type UserCommunity struct {
	gorm.Model
	UserID      int `gorm:"primaryKey"`
	CommunityID int `gorm:"primaryKey"`
	Score       int
	PinnedUsers []User `gorm:"many2many:user_community_pinned_users;"`
}
