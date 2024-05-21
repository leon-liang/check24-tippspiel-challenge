package model

import "gorm.io/gorm"

type Team struct {
	gorm.Model
	ID   string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Name string `gorm:"unique_index;not null"`
}
