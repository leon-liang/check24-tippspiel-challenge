package auth

import "github.com/Nerzal/gocloak/v13"

type Keycloak struct {
	GoCloak      gocloak.GoCloak
	ClientId     string
	ClientSecret string
	Realm        string
}

func New() *Keycloak {
	return &Keycloak{
		GoCloak:      *gocloak.NewClient("http://keycloak:8080"),
		ClientId:     "webclient",
		ClientSecret: "SXiMvr1GG10bk2J63ODZC9SOaoAZ4dbe",
		Realm:        "development",
	}
}
