package http

import (
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/utils"
	"net/http"
)

// GetJob godoc
// @Tags Jobs
// @Summary Retrieved specified job
// @Accept json
// @Produce json
// @Success 200 {object} http.jobResponse
// @Param job_name path string true "Job Name"
// @Router /v1/jobs/{job_name} [GET]
// @Security OAuth2Implicit
func (h *Handler) GetJob(ctx echo.Context) error {
	jobName := ctx.Param("job_id")
	job, err := h.JobStore.GetByName(jobName)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, utils.NewError(err))
	}

	if job == nil {
		return ctx.JSON(http.StatusNotFound, utils.NotFound())
	}

	response := newJobResponse(*job)
	return ctx.JSON(http.StatusOK, &response)
}
