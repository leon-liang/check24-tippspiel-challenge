package main

import (
	"context"
	"errors"
	gorillaWs "github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	keycloak "github.com/leon-liang/check24-tippspiel-challenge/server/auth"
	"github.com/leon-liang/check24-tippspiel-challenge/server/db"
	_ "github.com/leon-liang/check24-tippspiel-challenge/server/docs"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler/http"
	"github.com/leon-liang/check24-tippspiel-challenge/server/handler/seeds"
	websocket "github.com/leon-liang/check24-tippspiel-challenge/server/handler/ws"
	"github.com/leon-liang/check24-tippspiel-challenge/server/jobs/enqueuer"
	"github.com/leon-liang/check24-tippspiel-challenge/server/jobs/worker"
	"github.com/leon-liang/check24-tippspiel-challenge/server/kafka"
	"github.com/leon-liang/check24-tippspiel-challenge/server/mq"
	"github.com/leon-liang/check24-tippspiel-challenge/server/router"
	authMiddleware "github.com/leon-liang/check24-tippspiel-challenge/server/router/middleware"
	"github.com/leon-liang/check24-tippspiel-challenge/server/store"
	echoSwagger "github.com/swaggo/echo-swagger"
	"log"
	netHttp "net/http"
	"os"
	"os/signal"
	"time"
)

// @title Check24 Tippspiel Challenge
// @version 1.0
// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @in header
// @name Authorization
// @authorizationurl http://localhost:8080/realms/development/protocol/openid-connect/auth
func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	r := router.New()
	r.GET("/swagger/*", echoSwagger.WrapHandler)

	// Setup kafka
	topic := "matches"
	conn := kafka.NewConn(topic)
	defer conn.Close()

	w := kafka.NewWriter(topic)
	defer w.Close()

	// Setup database
	d := db.New()
	db.AutoMigrate(d)

	us := store.NewUserStore(d)
	cs := store.NewCommunityStore(d)
	ms := store.NewMatchStore(d)
	ts := store.NewTeamStore(d)
	bs := store.NewBetStore(d)
	mw := mq.NewMatchWriter(w)
	pe := enqueuer.NewPointsEnqueuer()

	// Setup Workers
	sw := worker.NewPointsWorkerPool(us, bs)
	sw.WorkerPool.Start()
	defer sw.WorkerPool.Stop()

	// Setup Seeder
	seedsHandler := seeds.NewHandler(*ms, *ts)
	seedsHandler.SeedTeams()
	seedsHandler.SeedMatches()

	// Setup Websocket
	var (
		upgrader = gorillaWs.Upgrader{
			CheckOrigin: func(r *netHttp.Request) bool {
				return true
			},
		}
	)

	httpHandler := http.NewHandler(*us, *cs, *ms, *ts, *bs, *mw, *pe)
	wsHandler := websocket.NewHandler(upgrader, *ms, *mw)

	r.GET("", httpHandler.GetRoot)

	v1 := r.Group("/v1")

	ws := v1.Group("/ws")
	wsHandler.Register(ws)

	keycloakClient := keycloak.New()
	v1.Use(authMiddleware.ValidateToken(keycloakClient))
	v1.Use(authMiddleware.GetCurrentUser(us))
	v1.Use(authMiddleware.ValidatePermissions([]string{}))

	httpHandler.Register(v1)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()

	go func() {
		if err := r.Start(":8000"); err != nil && !errors.Is(err, netHttp.ErrServerClosed) {
			r.Logger.Fatal("shutting down the server")
		}
	}()

	<-ctx.Done()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := r.Shutdown(ctx); err != nil {
		r.Logger.Fatal(err)
	}
}
