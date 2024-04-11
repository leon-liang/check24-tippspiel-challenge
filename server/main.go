package main

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/db"
	_ "github.com/leon-liang/check24-tippspiel-challenge/server/docs"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler"
	"github.com/leon-liang/check24-tippspiel-challenge/server/router"
	"github.com/swaggo/echo-swagger"
)

// @title Check24 Tippspiel Challenge
// @version 1.0
func main() {
	r := router.New()

	h := handler.NewHandler()

	v1 := r.Group("/")
	h.Register(v1)

	d := db.New()
	db.AutoMigrate(d)

	r.GET("/swagger/*", echoSwagger.WrapHandler)

	r.Logger.Fatal(r.Start(":8000"))
}
