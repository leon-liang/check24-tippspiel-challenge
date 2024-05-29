package model

import "time"

type Community struct {
	ID        string `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Name      string
	Owner     string
	Members   []*User `gorm:"many2many:community_members;"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
