package redis

import "github.com/gomodule/redigo/redis"

func NewRedisPool(maxActive int, maxIdle int) *redis.Pool {
	redisPool := redis.Pool{
		MaxActive: maxActive,
		MaxIdle:   maxIdle,
		Wait:      true,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", "redis:6379")
		},
	}

	return &redisPool
}
