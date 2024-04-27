package utils

import (
	"errors"
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type Error struct {
	Errors map[string]interface{} `json:"errors"`
}

func NewError(err error) Error {
	e := Error{}
	e.Errors = make(map[string]interface{})

	switch v := err.(type) {
	case *echo.HTTPError:
		e.Errors["body"] = v.Message
	default:
		e.Errors["body"] = v.Error()
	}
	return e
}

func NewValidatorError(err error) Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	var errs validator.ValidationErrors
	errors.As(err, &errs)
	for _, v := range errs {
		e.Errors[v.Field()] = fmt.Sprintf("%v", v.Tag())
	}
	return e
}

func AccessForbidden() Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	e.Errors["body"] = "Access forbidden"
	return e
}

func NotFound() Error {
	e := Error{}
	e.Errors = make(map[string]interface{})
	e.Errors["body"] = "Resource not found"
	return e
}
