package seeds

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"log"
	"time"
)

func (h *Handler) SeedMatches() {
	matches, err := h.MatchStore.GetMatches()
	if len(matches) == 0 && err == nil {
		data := utils.ReadCsvFile("data/game_schedule.csv", ';')
		// discard header row
		matches := data[1:]
		for _, m := range matches {
			homeTeam, err := h.TeamStore.GetTeamByName(m[0])
			if err != nil {
				log.Fatal(err)
			}

			awayTeam, err := h.TeamStore.GetTeamByName(m[1])
			if err != nil {
				log.Fatal(err)
			}

			t, err := time.Parse("2006-01-02 15:04:05", m[2])
			if err := h.MatchStore.Create(homeTeam, awayTeam, t); err != nil {
				log.Fatal(err)
			}
		}

	}
}
