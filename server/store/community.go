package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
	"sort"
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
	community.Members = append(community.Members, *user)

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

	if err := cs.db.Preload("JoinedCommunities").Preload("CreatedCommunities").Model(&user).Find(&user).Error; err != nil {
		return nil, err
	}

	communities = append(user.CreatedCommunities, user.JoinedCommunities...)
	sort.Slice(communities, func(i, j int) bool {
		return communities[i].Name < communities[j].Name
	})
	return communities, nil
}

func (cs *CommunityStore) GetCommunityMembers(community *model.Community) ([]model.User, error) {
	var owner model.User

	if err := cs.db.Find(&owner, "id = ?", community.Owner).Error; err != nil {
		return nil, err
	}

	if err := cs.db.Preload("Members").First(&community).Error; err != nil {
		return nil, err
	}

	members := append(community.Members, owner)
	return members, nil
}
