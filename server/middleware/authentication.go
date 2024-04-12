package middleware

import (
	"context"
	"github.com/labstack/echo/v4"
	"github.com/leon-liang/check24-tippspiel-challenge/server/auth"
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
				return echo.ErrUnauthorized
			}

			// Call Keycloak API to verify Access token
			result, err := keycloak.GoCloak.RetrospectToken(context.Background(), token, keycloak.ClientId, keycloak.ClientSecret, keycloak.Realm)

			if err != nil || !*result.Active {
				return echo.ErrUnauthorized
			}

			return next(c)
		}
	}
}
