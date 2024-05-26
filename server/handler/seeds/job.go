package seeds

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"log"
)

func (h *Handler) SeedJobs() {
	var job model.Job
	job.Name = "calculate_points"

	if err := h.JobStore.Create(&job); err != nil {
		log.Fatal(err)
	}
}
