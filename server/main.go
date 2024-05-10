package main

import (
	"github.com/joho/godotenv"
	keycloak "github.com/leon-liang/check24-tippspiel-challenge/server/auth"
	"github.com/leon-liang/check24-tippspiel-challenge/server/db"
	_ "github.com/leon-liang/check24-tippspiel-challenge/server/docs"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler/http"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler/seeds"
	"github.com/leon-liang/check24-tippspiel-challenge/server/router"
	authMiddleware "github.com/leon-liang/check24-tippspiel-challenge/server/router/middleware"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
	echoSwagger "github.com/swaggo/echo-swagger"
	"log"
	"os"
)

// @title Check24 Tippspiel Challenge
// @version 1.0
// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @in header
// @name Authorization
// @authorizationurl http://localhost:8080/realms/development/protocol/openid-connect/auth

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := router.New()

	// Only render swagger docs in development
	if os.Getenv("ENVIRONMENT") == "development" {
		r.GET("/swagger/*", echoSwagger.WrapHandler)
	}

	keycloakClient := keycloak.New()

	d := db.New()
	db.AutoMigrate(d)

	us := store.NewUserStore(d)
	cs := store.NewCommunityStore(d)
	ms := store.NewMatchStore(d)
	ts := store.NewTeamStore(d)

	seedsHandler := seeds.NewHandler(*ms, *ts)
	seedsHandler.SeedTeams()
	seedsHandler.SeedMatches()

	httpHandler := http.NewHandler(*us, *cs, *ms, *ts)

	r.GET("", httpHandler.GetRoot)

	v1 := r.Group("/v1", authMiddleware.ValidateToken(keycloakClient))
	v1.Use(authMiddleware.GetCurrentUser(httpHandler))

	httpHandler.Register(v1)

	r.Logger.Fatal(r.Start(":8000"))
}
