package auth

import (
	"github.com/Nerzal/gocloak/v13"
	"os"
)

type Keycloak struct {
	GoCloak      gocloak.GoCloak
	ClientId     string
	ClientSecret string
	Realm        string
}

func New() *Keycloak {
	return &Keycloak{
		GoCloak:      *gocloak.NewClient(os.Getenv("AUTH_SERVER_URL")),
		ClientId:     os.Getenv("AUTH_CLIENT_ID"),
		ClientSecret: os.Getenv("AUTH_CLIENT_SECRET"),
		Realm:        os.Getenv("AUTH_REALM"),
	}
}
