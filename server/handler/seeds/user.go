package seeds

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"log"
)

func (h *Handler) SeedAdmin() {
	count, err := h.UserStore.GetUserCount()

	if count <= 0 && err == nil {
		admin := model.User{
			Username:  "admin",
			Email:     "admin@check24.de",
			FirstName: "Admin",
			LastName:  "",
		}

		if err := h.UserStore.Create(&admin); err != nil {
			log.Fatal(err)
		}
	}
}
