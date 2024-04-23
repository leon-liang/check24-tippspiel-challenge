package store

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
)

type CommunityStore struct {
	db *gorm.DB
}

func NewCommunityStore(db *gorm.DB) *CommunityStore {
	return &CommunityStore{
		db: db,
	}
}

func (cs *CommunityStore) Create(community *model.Community) (err error) {
	return cs.db.Create(community).Error
}

func (cs *CommunityStore) GetUserCommunities(user *model.User) ([]model.Community, error) {
	var communities []model.Community

	// TODO: Also retrieve communities the user is a member of
	if err := cs.db.Where("owner = ?", user.ID).Find(&communities).Error; err != nil {
		return nil, err
	}

	return communities, nil
}
