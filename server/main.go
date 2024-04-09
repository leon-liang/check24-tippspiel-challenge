package main

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		var response struct {
			Message string `json:"message"`
		}
		response.Message = "Hello World!"
		return c.JSON(http.StatusOK, &response)
	})

	e.Logger.Fatal(e.Start(":8000"))
}
