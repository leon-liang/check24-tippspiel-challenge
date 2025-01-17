package http

import (
	"github.com/gocraft/work"
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"math"
	"net/http"
)

// CalculatePoints godoc
// @Tags Points
// @Summary Calculate points based on the current of the current match scores and bets
// @Success 200 {object} http.jobResponse
// @Router /v1/points [PUT]
// @Produce json
// @Security OAuth2Implicit
func (h *Handler) CalculatePoints(ctx echo.Context) error {
	jobName := "calculate_points"
	limit := 1000
	offset := 0

	userCount, err := h.UserStore.GetUserCount()
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err)
	}

	i := int(math.Ceil(float64(userCount) / float64(limit)))

	job, err := h.JobStore.GetByName(jobName)
	if err := h.JobStore.SetStatus(job, i, 0); err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	h.JobWriter.WriteJob(job)

	for range i {
		_, err := h.PointsEnqueuer.Enqueuer.Enqueue(jobName, work.Q{"limit": limit, "offset": offset})
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
		}

		offset += limit
	}

	response := newJobResponse(*job)
	return ctx.JSON(http.StatusOK, response)
}
