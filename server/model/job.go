package model

import (
	"gorm.io/gorm"
	"time"
)

type Job struct {
	gorm.Model
	ID          string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Name        string
	Outstanding int       `gorm:"default:0"`
	Completed   int       `gorm:"default:0"`
	CompletedAt time.Time `gorm:"default:current_timestamp"`
}
