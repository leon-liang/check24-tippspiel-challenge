package store

import (
	"errors"
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

func (cs *CommunityStore) Join(user *model.User, community *model.Community) (err error) {
	// Check if the user is already a member of the community
	for _, member := range community.Members {
		if member.ID == user.ID {
			return errors.New("user is already a member of the community")
		}
	}

	// Check if the user is the owner of the community
	if user.ID == community.Owner {
		return errors.New("user is owner of the community")
	}

	community.Members = append(community.Members, user)

	if err := cs.db.Save(&community).Error; err != nil {
		return err
	}

	return nil
}

func (cs *CommunityStore) GetCommunitiesById(id string) (*model.Community, error) {
	var community model.Community

	err := cs.db.Where(&model.Community{ID: id}).Find(&community).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &community, err
}

func (cs *CommunityStore) GetUserCommunities(user *model.User) ([]model.Community, error) {
	var communities []model.Community

	if err := cs.db.Where("owner = ?", user.ID).Or("id IN (SELECT community_id FROM user_community WHERE user_id = ?)", user.ID).Find(&communities).Error; err != nil {
		return nil, err
	}

	return communities, nil
}
