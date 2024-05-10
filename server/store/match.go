package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
	"time"
)

type MatchStore struct {
	db *gorm.DB
}

func NewMatchStore(db *gorm.DB) *MatchStore {
	return &MatchStore{
		db: db,
	}
}

func (ms *MatchStore) GetMatches() ([]model.Match, error) {
	var matches []model.Match

	err := ms.db.Find(&matches).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return matches, err
}

func (ms *MatchStore) Create(homeTeam *model.Team, awayTeam *model.Team, gameTime time.Time) (err error) {
	var match model.Match

	match.HomeTeam = homeTeam
	match.AwayTeam = awayTeam
	match.GameTime = gameTime

	return ms.db.Create(&match).Error
}
