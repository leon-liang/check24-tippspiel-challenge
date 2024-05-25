package redis

import (
	"github.com/gomodule/redigo/redis"
	"os"
)

func NewRedisPool(maxActive int, maxIdle int) *redis.Pool {
	redisHost := os.Getenv("REDIS_HOST")
	redisPort := os.Getenv("REDIS_PORT")

	redisPool := redis.Pool{
		MaxActive: maxActive,
		MaxIdle:   maxIdle,
		Wait:      true,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", redisHost+":"+redisPort)
		},
	}

	return &redisPool
}
