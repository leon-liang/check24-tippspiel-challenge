package http

import (
	"github.com/gocraft/work"
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"math"
	"net/http"
	"time"
)

// CalculatePoints godoc
// @Tags Points
// @Summary Calculate points based on the current of the current match scores and bets
// @Success 200
// @Router /v1/points [PUT]
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

	for range i {
		_, err := h.PointsEnqueuer.Enqueuer.Enqueue(jobName, work.Q{"limit": limit, "offset": offset})
		if err != nil {
			return ctx.JSON(http.StatusInternalServerError, err)
		}

		offset += limit
	}

	job, err := h.JobStore.GetByName(jobName)
	if job == nil {
		job := model.Job{
			Name: jobName,
		}
		if err := h.JobStore.Create(&job); err != nil {
			return ctx.JSON(http.StatusInternalServerError, err)
		}
	}

	if err := h.JobStore.UpdateUpdatedAt(job, time.Now()); err != nil {
		return ctx.JSON(http.StatusInternalServerError, err)
	}

	return ctx.NoContent(http.StatusOK)
}