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

func (us *UserStore) GetById(id string) (*model.User, error) {
	var m model.User

	if err := us.db.Where(&model.User{ID: id}).First(&m).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &m, nil
}

func (us *UserStore) Create(user *model.User) (err error) {
	tx := us.db.Begin()

	if err := tx.Exec("LOCK TABLE users IN ACCESS EXCLUSIVE MODE").Error; err != nil {
		tx.Rollback()
		return err
	}

	var count int64
	if err := tx.Model(user).Where(&model.User{Username: user.Username}).Count(&count).Error; err != nil {
		tx.Rollback()
		return err
	}

	if count > 0 {
		tx.Rollback()
		return errors.New("user already exists")
	}

	if err := tx.Create(user).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
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
