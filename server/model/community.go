package model

import "gorm.io/gorm"

type Community struct {
	gorm.Model
	ID      string `gorm:"type:uuid;default:gen_random_uuid()"`
	Name    string
	Owner   uint
	Members []*User `gorm:"many2many:user_community;"`
}
