package store

import (
	"errors"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"gorm.io/gorm"
	"time"
)

type JobStore struct {
	db *gorm.DB
}

func NewJobStore(db *gorm.DB) *JobStore {
	return &JobStore{
		db: db,
	}
}

func (js *JobStore) GetJobs() ([]model.Job, error) {
	var jobs []model.Job

	if err := js.db.Find(&jobs).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}

	return jobs, nil
}

func (js *JobStore) GetByName(name string) (*model.Job, error) {
	var j model.Job
	if err := js.db.Where(&model.Job{Name: name}).First(&j).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &j, nil
}

func (js *JobStore) Create(job *model.Job) (err error) {
	return js.db.Create(job).Error
}

func (js *JobStore) UpdateCompletedAt(job *model.Job, completedAt time.Time) (err error) {
	tx := js.db.Begin()

	if err := tx.Model(job).Update("CompletedAt", completedAt).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}

func (js *JobStore) SetStatus(job *model.Job, outstanding int, completed int) (err error) {
	tx := js.db.Begin()

	if err := tx.Model(job).Update("Outstanding", outstanding).Update("Completed", completed).Error; err != nil {
		tx.Rollback()
		return err
	}

	return tx.Commit().Error
}
