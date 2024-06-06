package cache

import (
	"errors"
	"github.com/gomodule/redigo/redis"
	"github.com/leon-liang/check24-tippspiel-challenge/server/dto"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"log"
	"time"
)

type LeaderboardCache struct {
	pool *redis.Pool
}

func NewLeaderboardCache(pool *redis.Pool) *LeaderboardCache {
	return &LeaderboardCache{
		pool: pool,
	}
}

func (ucc *LeaderboardCache) Get(member *dto.Member, community *model.Community) (*int, error) {
	currentDate := time.Now().Local().Format("2006-01-02")
	key := "community:" + community.ID + "user:" + member.ID + "positionAt:" + currentDate

	conn := (*ucc.pool).Get()
	defer conn.Close()

	position, err := redis.Int(conn.Do("GET", key))
	if err != nil {
		if errors.Is(err, redis.ErrNil) {
			return nil, nil
		}
		log.Fatal(err)
	}

	return &position, nil
}

func (ucc *LeaderboardCache) Set(member *dto.Member, community *model.Community) error {
	currentDate := time.Now().Local().Format("2006-01-02")
	key := "community:" + community.ID + "user:" + member.ID + "positionAt:" + currentDate

	conn := (*ucc.pool).Get()
	defer conn.Close()

	_, err := conn.Do("SET", key, member.Position)
	_, err = conn.Do("EXPIRE", key, int(24*time.Hour/time.Second))

	return err
}
