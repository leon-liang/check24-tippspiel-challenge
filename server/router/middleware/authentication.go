package middleware

import (
	"context"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/auth"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"strings"
)

func extractBearerToken(token string) string {
	return strings.Replace(token, "Bearer ", "", 1)
}

func ValidateToken(keycloak *auth.Keycloak) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Extract authorization parameter from HTTP Header
			token := c.Request().Header.Get("Authorization")
			token = extractBearerToken(token)

			if token == "" {
				fmt.Println("Access Token missing")
				return echo.ErrUnauthorized
			}

			// Call Keycloak API to verify Access token
			result, err := keycloak.GoCloak.RetrospectToken(context.Background(), token, keycloak.ClientId, keycloak.ClientSecret, keycloak.Realm)

			if err != nil {
				fmt.Println(err)
				return echo.ErrUnauthorized
			}

			if !*result.Active {
				fmt.Println("Access Token expired")
				return echo.ErrUnauthorized
			}

			return next(c)
		}
	}
}

func ValidatePermissions(requiredPermissions []string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// TODO
			return next(c)
		}
	}
}

func GetCurrentUser(h *handler.Handler) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token := c.Request().Header.Get("Authorization")
			token = extractBearerToken(token)

			if token == "" {
				fmt.Println("Access Token missing")
				return echo.ErrUnauthorized
			}

			// Extract data from Access token
			parser := jwt.NewParser()
			parsedToken, _, err := parser.ParseUnverified(token, jwt.MapClaims{})

			if err != nil {
				fmt.Println(err)
				return echo.ErrUnauthorized
			}

			claims := parsedToken.Claims.(jwt.MapClaims)

			username := claims["preferred_username"].(string)
			email := claims["email"].(string)
			firstName := claims["given_name"].(string)
			lastName := claims["family_name"].(string)

			user, err := h.UserStore.GetByUsername(username)

			if err != nil {
				fmt.Println(err)
				return echo.ErrInternalServerError
			}

			if user != nil {
				c.Set("current_user", user)
				return next(c)
			}

			// create user if not in database
			newUser := model.User{
				Username:  username,
				Email:     email,
				FirstName: firstName,
				LastName:  lastName,
			}

			if err := h.UserStore.Create(&newUser); err != nil {
				fmt.Println(err)
				return echo.ErrInternalServerError
			}

			c.Set("current_user", newUser)
			return next(c)
		}
	}
}
