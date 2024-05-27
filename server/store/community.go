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
	community.Members = append(community.Members, user)

	if err := cs.db.Save(&community).Error; err != nil {
		return err
	}

	return nil
}

func (cs *CommunityStore) Delete(user *model.User, community *model.Community) (err error) {
	tx := cs.db.Begin()

	// Delete community from each member's joined communities
	if err := cs.db.Preload("Members").First(&community).Error; err != nil {
		tx.Rollback()
		return err
	}

	for _, member := range community.Members {
		if err := cs.db.Preload("JoinedCommunities").First(&member).Error; err != nil {
			tx.Rollback()
			return err
		}

		index := -1
		for i, joinedCommunity := range member.JoinedCommunities {
			if joinedCommunity.ID == community.ID {
				index = i
				break
			}
		}

		if index == -1 {
			tx.Rollback()
			return errors.New("user is not part of the community")
		}

		member.JoinedCommunities[index] = member.JoinedCommunities[len(member.JoinedCommunities)-1]
		member.JoinedCommunities = member.JoinedCommunities[:len(member.JoinedCommunities)-1]

		if err := cs.db.Model(&member).Association("JoinedCommunities").Replace(member.JoinedCommunities); err != nil {
			tx.Rollback()
			return err
		}
	}

	// Delete community from CreatedCommunities
	if err := cs.db.Preload("CreatedCommunities").First(&user).Error; err != nil {
		tx.Rollback()
		return err
	}

	index := -1
	for i, createdCommunity := range user.CreatedCommunities {
		if createdCommunity.ID == community.ID {
			index = i
			break
		}
	}

	if index == -1 {
		tx.Rollback()
		return errors.New("user is not owner of the community")
	}

	user.CreatedCommunities[index] = user.CreatedCommunities[len(user.CreatedCommunities)-1]
	user.CreatedCommunities = user.CreatedCommunities[:len(user.CreatedCommunities)-1]

	if err := cs.db.Model(&user).Association("CreatedCommunities").Replace(user.CreatedCommunities); err != nil {
		tx.Rollback()
		return err
	}

	if err := cs.db.Unscoped().Delete(community).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (cs *CommunityStore) Leave(user *model.User, community *model.Community) (err error) {
	index := -1

	for i, member := range community.Members {
		if member.ID == user.ID {
			index = i
			break
		}
	}

	if index == -1 {
		return errors.New("user is not part of the community")
	}

	community.Members[index] = community.Members[len(community.Members)-1]
	community.Members = community.Members[:len(community.Members)-1]

	if err := cs.db.Model(&community).Association("Members").Replace(community.Members); err != nil {
		return err
	}

	return nil
}

func (cs *CommunityStore) GetCommunityById(id string) (*model.Community, error) {
	var community model.Community

	err := cs.db.Preload("Members").Where(&model.Community{ID: id}).First(&community).Error
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

func (cs *CommunityStore) GetCommunityMembers(community *model.Community) ([]*model.User, error) {
	var owner model.User

	if err := cs.db.Find(&owner, "id = ?", community.Owner).Error; err != nil {
		return nil, err
	}

	if err := cs.db.Preload("Members").First(&community).Error; err != nil {
		return nil, err
	}

	members := append(community.Members, &owner)
	return members, nil
}

//func (cs *CommunityStore) GetUserPosition(user *model.User, community *model.Community) (int, error) {
//	query := `
//		WITH CommunityMembers AS (
//			FROM users u SELECT * from communities c
//			LEFT JOIN user_community uc ON c.ID = uc.community_id
//			LEFT JOIN User u
//	)`
//}
