package db

import (
	"fmt"
	"gorm.io/driver/postgres"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func New() *gorm.DB {
	dbUrl := "postgresql://db:5432/dev?user=root&password=password"
	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})

	if err != nil {
		fmt.Println("Database Error: ", err)
	}

	return db
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate()
}
