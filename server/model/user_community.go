package model

import "gorm.io/gorm"

type UserCommunity struct {
	gorm.Model
	UserID      string `gorm:"primaryKey"`
	CommunityID string `gorm:"primaryKey;constraint:OnDelete:CASCADE;"`
	PinnedUsers []User `gorm:"many2many:user_community_pinned_users;"`
}
