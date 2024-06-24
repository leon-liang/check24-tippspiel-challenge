package seeds

import (
	"github.com/jaswdr/faker/v2"
	"github.com/leon-liang/check24-tippspiel-challenge/server/cache"
	"github.com/leon-liang/check24-tippspiel-challenge/server/dto"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
	"log"
	"strings"
)

type Handler struct {
	MatchStore       store.MatchStore
	TeamStore        store.TeamStore
	CommunityStore   store.CommunityStore
	UserStore        store.UserStore
	JobStore         store.JobStore
	LeaderboardCache cache.LeaderboardCache
}

func NewHandler(ms store.MatchStore, ts store.TeamStore, cs store.CommunityStore, us store.UserStore, js store.JobStore, lc cache.LeaderboardCache) *Handler {
	return &Handler{
		MatchStore:       ms,
		TeamStore:        ts,
		CommunityStore:   cs,
		UserStore:        us,
		JobStore:         js,
		LeaderboardCache: lc,
	}
}

func (h *Handler) Seed() {
	u, err := h.UserStore.GetByUsername("leon.liang")
	if err != nil {
		log.Fatal(err)
	}

	globalCommunity, err := h.CommunityStore.Find(&model.Community{Name: "CHECK24 Global"})
	if err != nil {
		log.Fatal(err)
	}

	if u == nil {
		user := model.User{
			Username:  "leon.liang",
			Email:     "mail@leonliang.lu",
			FirstName: "Leon",
			LastName:  "Liang",
		}
		if err := h.UserStore.Create(&user); err != nil {
			log.Fatal(err)
		}
		u = &user

		if err := h.CommunityStore.Join(&user, globalCommunity); err != nil {
			log.Fatal(err)
		}

		m, err := h.CommunityStore.GetMembersWithUsername(globalCommunity, user.Username)
		if err != nil {
			log.Fatal(err)
		}
		if err := h.LeaderboardCache.Set(m, globalCommunity); err != nil {
			log.Fatal(err)
		}
	}

	community := model.Community{
		Name:  "Community A",
		Owner: u.ID,
	}

	if err := h.CommunityStore.Create(&community); err != nil {
		log.Fatal(err)
	}

	member := dto.Member{
		ID:           u.ID,
		Username:     u.Username,
		Points:       0,
		Position:     1,
		PrevPosition: 1,
		Rank:         1,
	}

	if err := h.LeaderboardCache.Set(&member, &community); err != nil {
		log.Fatal(err)
	}

	fake := faker.New()
	for i := 0; i < 1000; i++ {
		p := fake.Person()

		firstName := p.FirstName()
		lastName := p.LastName()

		username := strings.ToLower(firstName) + "." + strings.ToLower(lastName)

		user := model.User{
			Username:  username,
			Email:     username + "@gmail.com",
			FirstName: firstName,
			LastName:  lastName,
		}

		if err := h.UserStore.Create(&user); err != nil {
			log.Fatal(err)
		}

		if err := h.CommunityStore.Join(&user, globalCommunity); err != nil {
			log.Fatal(err)
		}

		globalMember, err := h.CommunityStore.GetMembersWithUsername(globalCommunity, user.Username)
		if err != nil {
			log.Fatal(err)
		}

		if err := h.LeaderboardCache.Set(globalMember, globalCommunity); err != nil {
			log.Fatal(err)
		}

		if err := h.CommunityStore.Join(&user, &community); err != nil {
			log.Fatal(err)
		}

		member, err := h.CommunityStore.GetMembersWithUsername(&community, user.Username)
		if err != nil {
			log.Fatal(err)
		}
		if err := h.LeaderboardCache.Set(member, &community); err != nil {
			log.Fatal(err)
		}
	}
}
