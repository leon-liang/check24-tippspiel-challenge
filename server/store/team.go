package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
)

type TeamStore struct {
	db *gorm.DB
}

func NewTeamStore(db *gorm.DB) *TeamStore {
	return &TeamStore{
		db: db,
	}
}

func (ts *TeamStore) GetTeams() ([]model.Team, error) {
	var teams []model.Team

	err := ts.db.Find(&teams).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return teams, err
}

func (ts *TeamStore) Create(name string) (err error) {
	var team model.Team
	team.Name = name

	return ts.db.Create(&team).Error
}
