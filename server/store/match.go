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

	err := ms.db.Preload("HomeTeam").Preload("AwayTeam").Find(&matches).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return matches, err
}

func (ms *MatchStore) GetMatchById(id string) (*model.Match, error) {
	var match model.Match

	err := ms.db.Preload("HomeTeam").Preload("AwayTeam").Where(&model.Match{ID: id}).Find(&match).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &match, err
}

func (ms *MatchStore) Create(homeTeam *model.Team, awayTeam *model.Team, gameTime time.Time) (err error) {
	var match model.Match

	match.HomeTeam = homeTeam
	match.AwayTeam = awayTeam
	match.GameTime = gameTime

	return ms.db.Create(&match).Error
}

func (ms *MatchStore) UpdateMatchTeams(m *model.Match, homeTeam *model.Team, awayTeam *model.Team) (err error) {
	tx := ms.db.Begin()

	if err := tx.Model(m).Update("HomeTeam", homeTeam).Update("AwayTeam", awayTeam).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (ms *MatchStore) UpdateMatchResults(m *model.Match, homeTeamResult *int, awayTeamResult *int) (err error) {
	tx := ms.db.Begin()

	if err := tx.Model(m).Update("HomeTeamResult", homeTeamResult).Update("AwayTeamResult", awayTeamResult).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
