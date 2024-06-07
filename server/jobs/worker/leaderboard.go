package worker

import (
	"fmt"
	"github.com/gocraft/work"
	"github.com/leon-liang/check24-tippspiel-challenge/server/cache"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
	"log"
	"math"
)

type LeaderboardWorkerPool struct {
	WorkerPool *work.WorkerPool
}

type LeaderboardContext struct {
	cs *store.CommunityStore
	lc *cache.LeaderboardCache
}

func NewLeaderboardWorkerPool(cs *store.CommunityStore, lc *cache.LeaderboardCache) *LeaderboardWorkerPool {
	leaderboardContext := LeaderboardContext{}
	leaderboardWorkerPool := NewWorkerPool(leaderboardContext, "leaderboard")

	leaderboardWorkerPool.Middleware(func(ctx *LeaderboardContext, job *work.Job, next work.NextMiddlewareFunc) error {
		ctx.cs = cs
		ctx.lc = lc

		return next()
	})

	leaderboardWorkerPool.Middleware((*LeaderboardContext).Log)

	leaderboardWorkerPool.PeriodicallyEnqueue("0 0 0 * * *", "cache_leaderboard")
	leaderboardWorkerPool.Job("cache_leaderboard", (*LeaderboardContext).CacheLeaderboard)

	return &LeaderboardWorkerPool{
		WorkerPool: leaderboardWorkerPool,
	}
}

func (ctx *LeaderboardContext) Log(job *work.Job, next work.NextMiddlewareFunc) error {
	fmt.Println("Starting job: ", job.Name)
	return next()
}

func (ctx *LeaderboardContext) CacheLeaderboard(job *work.Job) error {
	limit := 1000
	communityOffset := 0

	communityCount, err := ctx.cs.GetCommunityCount()
	if err != nil {
		return err
	}

	i := int(math.Ceil(float64(communityCount) / float64(limit)))

	for range i {
		communities, err := ctx.cs.GetAll(communityOffset, limit)
		if err != nil {
			log.Fatal(err)
		}

		for _, community := range communities {
			membersOffset := 0
			membersCount, err := ctx.cs.GetCommunityMembersCount(&community)
			if err != nil {
				log.Fatal(err)
			}

			j := int(math.Ceil(float64(membersCount) / float64(limit)))
			for range j {
				members, err := ctx.cs.GetMembersAtPosition(&community, membersOffset, membersOffset+limit)
				if err != nil {
					log.Fatal(err)
				}

				for _, member := range members {
					if err := ctx.lc.Set(member, &community); err != nil {
						log.Fatal(err)
					}
				}
				membersOffset += limit
			}

		}
		communityOffset += limit
	}
	return nil
}
