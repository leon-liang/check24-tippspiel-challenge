package main

import (
	"github.com/joho/godotenv"
	keycloak "github.com/leon-liang/check24-tippspiel-challenge/server/auth"
	"github.com/leon-liang/check24-tippspiel-challenge/server/db"
	_ "github.com/leon-liang/check24-tippspiel-challenge/server/docs"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler"
	authMiddleware "github.com/leon-liang/check24-tippspiel-challenge/server/middleware"
	"github.com/leon-liang/check24-tippspiel-challenge/server/router"
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

	h := handler.NewHandler()

	v1 := r.Group("/", authMiddleware.ValidateToken(keycloakClient))
	h.Register(v1)

	d := db.New()
	db.AutoMigrate(d)

	r.Logger.Fatal(r.Start(":8000"))
}
