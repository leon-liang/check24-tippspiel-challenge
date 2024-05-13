package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
)

type BetStore struct {
	db *gorm.DB
}

func NewBetStore(db *gorm.DB) *BetStore {
	return &BetStore{
		db: db,
	}
}

func (bs *BetStore) Create(bet *model.Bet) (err error) {
	return bs.db.Create(bet).Error
}

func (bs *BetStore) GetBets(user *model.User) ([]model.Bet, error) {
	var bets []model.Bet

	if err := bs.db.Preload("Match.HomeTeam").Preload("Match.AwayTeam").Where(&model.Bet{Bettor: user.ID}).Find(&bets).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return bets, nil
}

func (bs *BetStore) GetBetById(userID string, id string) (*model.Bet, error) {
	var b model.Bet

	err := bs.db.Preload("Match.HomeTeam").Preload("Match.AwayTeam").Where(&model.Bet{Bettor: userID, ID: id}).Find(&b).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}
	return &b, err
}

func (bs *BetStore) UpdateBet(b *model.Bet, homeTeam *int, awayTeam *int) (err error) {
	tx := bs.db.Begin()
	if err := tx.Model(b).Update("HomeTeam", homeTeam).Update("AwayTeam", awayTeam).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
