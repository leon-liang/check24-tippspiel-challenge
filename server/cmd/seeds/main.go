package main

import (
	"github.com/joho/godotenv"
	"github.com/leon-liang/check24-tippspiel-challenge/server/cache"
	"github.com/leon-liang/check24-tippspiel-challenge/server/db"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler/seeds"
	"github.com/leon-liang/check24-tippspiel-challenge/server/redis"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
	"log"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	d := db.New()

	rp := redis.NewRedisPool(5, 5)

	ms := store.NewMatchStore(d)
	ts := store.NewTeamStore(d)
	cs := store.NewCommunityStore(d)
	us := store.NewUserStore(d)
	js := store.NewJobStore(d)
	lc := cache.NewLeaderboardCache(rp)

	seedsHandler := seeds.NewHandler(*ms, *ts, *cs, *us, *js, *lc)

	seedsHandler.Seed()
}
