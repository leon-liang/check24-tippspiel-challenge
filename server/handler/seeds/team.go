package seeds

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"log"
)

func (h *Handler) SeedTeams() {
	teams, err := h.TeamStore.GetTeams()

	if len(teams) == 0 && err == nil {
		data := utils.ReadCsvFile("data/game_schedule.csv", ';')

		// Extract teams from matches in the group stage (first 36 matches)
		groupStageMatches := data[1:37]
		var teams []*string
		for _, m := range groupStageMatches {
			for j, entry := range m {
				if j == 0 || j == 1 {
					teams = append(teams, &entry)
				}
			}
		}

		teams = utils.Unique(teams)
		for _, team := range teams {
			if err := h.TeamStore.Create(*team); err != nil {
				log.Fatal(err)
			}
		}
	}
}
