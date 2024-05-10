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

	if err := bs.db.Preload("Match").Where(&model.Bet{Bettor: user.ID}).Find(&bets).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return bets, nil
}
