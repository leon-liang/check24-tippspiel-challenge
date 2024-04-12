package main

import (
	keycloak "github.com/leon-liang/check24-tippspiel-challenge/server/auth"
	"github.com/leon-liang/check24-tippspiel-challenge/server/db"
	_ "github.com/leon-liang/check24-tippspiel-challenge/server/docs"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler"
	authMiddleware "github.com/leon-liang/check24-tippspiel-challenge/server/middleware"
	"github.com/leon-liang/check24-tippspiel-challenge/server/router"
	echoSwagger "github.com/swaggo/echo-swagger"
)

// @title Check24 Tippspiel Challenge
// @version 1.0
func main() {
	r := router.New()
	r.GET("/swagger/*", echoSwagger.WrapHandler)

	keycloakClient := keycloak.New()

	h := handler.NewHandler()

	v1 := r.Group("/", authMiddleware.ValidateToken(keycloakClient))
	h.Register(v1)

	d := db.New()
	db.AutoMigrate(d)

	r.Logger.Fatal(r.Start(":8000"))
}
