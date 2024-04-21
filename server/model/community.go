package model

import "gorm.io/gorm"

type Community struct {
	gorm.Model
	Name    string
	Owner   uint
	Members []*User `gorm:"many2many:user_community;"`
}
