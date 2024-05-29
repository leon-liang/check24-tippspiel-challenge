package model

import (
	"gorm.io/gorm"
	"time"
)

type Job struct {
	gorm.Model
	Name        string
	Outstanding int       `gorm:"default:0"`
	Completed   int       `gorm:"default:0"`
	CompletedAt time.Time `gorm:"default:current_timestamp"`
}
