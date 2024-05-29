package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
)

type UserCommunityStore struct {
	db *gorm.DB
}

func NewUserCommunityStore(db *gorm.DB) *UserCommunityStore {
	return &UserCommunityStore{
		db: db,
	}
}

func (ucs *UserCommunityStore) AddPinnedUser(currentUser *model.User, user *model.User, community *model.Community) error {
	var userCommunity model.UserCommunity
	userCommunity.UserID = currentUser.ID
	userCommunity.CommunityID = community.ID

	if err := ucs.db.Find(&userCommunity).Error; err != nil {
		return err
	}

	userCommunity.PinnedUsers = append(userCommunity.PinnedUsers, *user)
	if err := ucs.db.Save(&userCommunity).Error; err != nil {
		return err
	}

	return nil
}

func (ucs *UserCommunityStore) DeletePinnedUser(currentUser *model.User, user *model.User, community *model.Community) error {
	var userCommunity model.UserCommunity
	userCommunity.UserID = currentUser.ID
	userCommunity.CommunityID = community.ID

	if err := ucs.db.Preload("PinnedUsers").First(&userCommunity).Error; err != nil {
		return err
	}

	index := -1
	for i, member := range userCommunity.PinnedUsers {
		if member.ID == user.ID {
			index = i
			break
		}
	}

	if index == -1 {
		return errors.New("user is not part of the community")
	}

	userCommunity.PinnedUsers[index] = userCommunity.PinnedUsers[len(userCommunity.PinnedUsers)-1]
	userCommunity.PinnedUsers = userCommunity.PinnedUsers[:len(userCommunity.PinnedUsers)-1]

	if err := ucs.db.Model(&userCommunity).Association("PinnedUsers").Replace(userCommunity.PinnedUsers); err != nil {
		return err
	}

	return nil
}
