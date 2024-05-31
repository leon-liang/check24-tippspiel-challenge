package seeds

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"log"
)

func (h *Handler) SeedCommunities() {
	isEmpty, err := h.CommunityStore.IsEmpty()

	if isEmpty && err == nil {

		admin, err := h.UserStore.GetByUsername("admin")
		if err != nil {
			log.Fatal(err)
		}

		var global model.Community
		global.Name = "CHECK24 Global"
		global.Owner = admin.ID

		if err := h.CommunityStore.Create(&global); err != nil {
			log.Fatal(err)
		}
	}
}
