package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username    string `gorm:"unique_index;not null"`
	Email       string `gorm:"unique_index;not null"`
	FirstName   string
	LastName    string
	Communities []Community
}
