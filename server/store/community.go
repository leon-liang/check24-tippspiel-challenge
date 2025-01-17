package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/dto"
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

func (cs *CommunityStore) IsEmpty() (bool, error) {
	var isEmpty bool
	query := `
		SELECT EXISTS (
			SELECT 1
			FROM communities
		)
	`

	if err := cs.db.Raw(query).Scan(&isEmpty).Error; err != nil {
		return false, err
	}
	return !isEmpty, nil
}

func (cs *CommunityStore) Find(community *model.Community) (*model.Community, error) {
	var c model.Community
	if err := cs.db.Where(community).Find(&c).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &c, nil
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

	query := `
		DELETE FROM community_members 
		WHERE community_id = ?
	`

	if err := cs.db.Exec(query, community.ID).Error; err != nil {
		tx.Rollback()
		return err
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

func (cs *CommunityStore) IsMember(user *model.User, community *model.Community) (bool, error) {
	var isMember bool
	query := `
		SELECT EXISTS (
        SELECT 1
        FROM communities
        WHERE communities.id = ? AND communities.owner = ?
        UNION
        SELECT 1
        FROM community_members
        WHERE community_members.community_id = ? AND community_members.user_id = ?
    )
	`

	if err := cs.db.Raw(query, community.ID, user.ID, community.ID, user.ID).Scan(&isMember).Error; err != nil {
		return false, err
	}

	return isMember, nil
}

func (cs *CommunityStore) Leave(user *model.User, community *model.Community) (err error) {
	query := `
		DELETE FROM community_members 
		WHERE community_id = ? AND user_id = ?
	`

	if err := cs.db.Exec(query, community.ID, user.ID).Error; err != nil {
		return err
	}

	return nil
}

func (cs *CommunityStore) GetCommunityById(id string) (*model.Community, error) {
	var community model.Community

	err := cs.db.Where(&model.Community{ID: id}).First(&community).Error
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

func (cs *CommunityStore) GetCommunityMembers(community *model.Community) ([]*dto.Member, error) {
	var members []*dto.Member

	query := `
		WITH members AS (
			SELECT u.*
			FROM users u
			INNER JOIN community_members cm
			ON u.id = cm.user_id
			WHERE cm.community_id = ?
			
			UNION
		
			SELECT u.*
			FROM users u
			INNER JOIN communities c
			ON u.id = c.owner
			WHERE c.id = ?
		),
		ranked_members AS (
			SELECT m.*, 
			ROW_NUMBER() OVER (ORDER BY m.points DESC, created_at ASC) AS position,
    		DENSE_RANK() OVER (ORDER BY m.points DESC) AS rank
			FROM members m
		)
		SELECT * FROM ranked_members
	`

	if err := cs.db.Raw(query, community.ID, community.ID).Scan(&members).Error; err != nil {
		return nil, err
	}

	return members, nil
}

func (cs *CommunityStore) GetCommunityMembersCount(community *model.Community) (int, error) {
	var count int

	query := `
		WITH members AS (
			SELECT u.*
			FROM users u
			INNER JOIN community_members cm
			ON u.id = cm.user_id
			WHERE cm.community_id = ?
			
			UNION
		
			SELECT u.*
			FROM users u
			INNER JOIN communities c
			ON u.id = c.owner
			WHERE c.id = ?
		)
		SELECT COUNT(*) FROM members
	`

	if err := cs.db.Raw(query, community.ID, community.ID).Scan(&count).Error; err != nil {
		return -1, err
	}

	return count, nil
}

func (cs *CommunityStore) GetUserPosition(user *model.User, community *model.Community) (int, error) {
	var rank int

	query := `
		WITH members AS (
			SELECT u.*
			FROM users u
			INNER JOIN community_members cm
			ON u.id = cm.user_id
			WHERE cm.community_id = ?
			
			UNION
		
			SELECT u.*
			FROM users u
			INNER JOIN communities c
			ON u.id = c.owner
			WHERE c.id = ?
		),
		ranked_members AS (
			SELECT m.*, 
			ROW_NUMBER() OVER (ORDER BY m.points DESC, created_at ASC) AS position,
    		DENSE_RANK() OVER (ORDER BY m.points DESC) AS rank
			FROM members m
		)
		SELECT position
		FROM ranked_members
		WHERE id = ?;
	`

	if err := cs.db.Raw(query, community.ID, community.ID, user.ID).Scan(&rank).Error; err != nil {
		return -1, err
	}

	return rank, nil
}

func (cs *CommunityStore) GetMembersAtPosition(community *model.Community, from int, to int) ([]*dto.Member, error) {
	var members []*dto.Member

	query := `
		WITH members AS (
			SELECT u.*
			FROM users u
			INNER JOIN community_members cm
			ON u.id = cm.user_id
			WHERE cm.community_id = ?
			
			UNION
		
			SELECT u.*
			FROM users u
			INNER JOIN communities c
			ON u.id = c.owner
			WHERE c.id = ?
		),
		ranked_members AS (
			SELECT m.*, 
			ROW_NUMBER() OVER (ORDER BY m.points DESC, created_at ASC) AS position,
    		DENSE_RANK() OVER (ORDER BY m.points DESC) AS rank

			FROM members m
		)
		SELECT * FROM ranked_members
		WHERE position BETWEEN ? AND ?
	`
	if err := cs.db.Raw(query, community.ID, community.ID, from, to).Scan(&members).Error; err != nil {
		return nil, err
	}

	return members, nil
}

func (cs *CommunityStore) GetMembersWithUsername(community *model.Community, username string) (*dto.Member, error) {
	var member dto.Member

	query := `
		WITH members AS (
			SELECT u.*
			FROM users u
			INNER JOIN community_members cm
			ON u.id = cm.user_id
			WHERE cm.community_id = ?
			
			UNION
		
			SELECT u.*
			FROM users u
			INNER JOIN communities c
			ON u.id = c.owner
			WHERE c.id = ?
		),
		ranked_members AS (
			SELECT m.*, 
			ROW_NUMBER() OVER (ORDER BY m.points DESC, created_at ASC) AS position,
    		DENSE_RANK() OVER (ORDER BY m.points DESC) AS rank
			FROM members m
		)
		SELECT * FROM ranked_members
		WHERE username = ?;`

	if err := cs.db.Raw(query, community.ID, community.ID, username).Scan(&member).Error; err != nil {
		return nil, err
	}

	return &member, nil
}

func (cs *CommunityStore) GetCommunityCount() (int64, error) {
	var count int64
	if err := cs.db.Model(&model.Community{}).Count(&count).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 0, nil
		}
		return 0, err
	}
	return count, nil
}

func (cs *CommunityStore) GetAll(offset int, limit int) ([]model.Community, error) {
	var communities []model.Community
	err := cs.db.Limit(limit).Offset(offset).Find(&communities).Error

	return communities, err
}
