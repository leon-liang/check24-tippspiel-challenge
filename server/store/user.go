package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
)

type UserStore struct {
	db *gorm.DB
}

func NewUserStore(db *gorm.DB) *UserStore {
	return &UserStore{
		db: db,
	}
}

func (us *UserStore) GetByUsername(username string) (*model.User, error) {
	var m model.User
	if err := us.db.Where(&model.User{Username: username}).First(&m).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &m, nil
}

func (us *UserStore) Create(user *model.User) (err error) {
	return us.db.Create(user).Error
}

func (us *UserStore) GetAll(offset int, limit int) ([]model.User, error) {
	var users []model.User
	err := us.db.Limit(limit).Offset(offset).Find(&users).Error

	return users, err
}

func (us *UserStore) UpdatePoints(user *model.User, points int) (err error) {
	tx := us.db.Begin()

	if err := tx.Model(user).Update("Points", points).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (us *UserStore) GetUserCount() (int64, error) {
	var count int64
	if err := us.db.Model(&model.User{}).Count(&count).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return 0, nil
		}
		return 0, err
	}
	return count, nil
}
