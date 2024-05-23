// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Root"
                ],
                "summary": "Example",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.rootResponse"
                        }
                    }
                }
            }
        },
        "/v1/bets": {
            "get": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Bets"
                ],
                "summary": "Retrieve all bets from the current user",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.betsResponse"
                        }
                    }
                }
            }
        },
        "/v1/bets/{bet_id}": {
            "put": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Bets"
                ],
                "summary": "Update bet with the given id",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Bet ID",
                        "name": "bet_id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Update Bet",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/http.betUpdateRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.betResponse"
                        }
                    }
                }
            }
        },
        "/v1/communities": {
            "get": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Communities"
                ],
                "summary": "Retrieve all communities the current user is part of",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.communitiesResponse"
                        }
                    }
                }
            },
            "post": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Communities"
                ],
                "summary": "Create a new community",
                "parameters": [
                    {
                        "description": "Create Community",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/http.communityCreateRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.communityResponse"
                        }
                    }
                }
            }
        },
        "/v1/communities/{community_id}": {
            "get": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Communities"
                ],
                "summary": "Retrieve a community with the given id",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Community ID",
                        "name": "community_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.communityResponse"
                        }
                    }
                }
            },
            "delete": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Communities"
                ],
                "summary": "Delete the specified community",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Community ID",
                        "name": "community_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.communityResponse"
                        }
                    }
                }
            }
        },
        "/v1/communities/{community_id}/join": {
            "post": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Communities"
                ],
                "summary": "Join the specified community",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Community ID",
                        "name": "community_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.communityResponse"
                        }
                    }
                }
            }
        },
        "/v1/communities/{community_id}/leave": {
            "put": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Communities"
                ],
                "summary": "Leave the specified community",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Community ID",
                        "name": "community_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.communityResponse"
                        }
                    }
                }
            }
        },
        "/v1/communities/{community_id}/members": {
            "get": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Communities"
                ],
                "summary": "Retrieve all users that are part of a community",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Community ID",
                        "name": "community_id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.communitiesResponse"
                        }
                    }
                }
            }
        },
        "/v1/matches": {
            "get": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Matches"
                ],
                "summary": "Retrieve all matches",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.matchesResponse"
                        }
                    }
                }
            }
        },
        "/v1/matches/{match_id}": {
            "put": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Matches"
                ],
                "summary": "Update match",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Match ID",
                        "name": "match_id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Update Match",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/http.matchUpdateRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.matchResponse"
                        }
                    }
                }
            }
        },
        "/v1/points": {
            "put": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "tags": [
                    "Points"
                ],
                "summary": "Calculate points based on the current of the current match scores and bets",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/v1/users/me": {
            "get": {
                "security": [
                    {
                        "OAuth2Implicit": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Users"
                ],
                "summary": "Get current user",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/http.userResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "http.Team": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "result": {
                    "type": "integer"
                }
            }
        },
        "http.betResponse": {
            "type": "object",
            "properties": {
                "awayTeam": {
                    "type": "integer"
                },
                "homeTeam": {
                    "type": "integer"
                },
                "id": {
                    "type": "string"
                },
                "match": {
                    "$ref": "#/definitions/http.matchResponse"
                }
            }
        },
        "http.betUpdateRequest": {
            "type": "object",
            "properties": {
                "bet": {
                    "type": "object",
                    "required": [
                        "awayTeam",
                        "homeTeam"
                    ],
                    "properties": {
                        "awayTeam": {
                            "type": "integer"
                        },
                        "homeTeam": {
                            "type": "integer"
                        }
                    }
                }
            }
        },
        "http.betsResponse": {
            "type": "object",
            "properties": {
                "bets": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/http.betResponse"
                    }
                }
            }
        },
        "http.communitiesResponse": {
            "type": "object",
            "properties": {
                "communities": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/http.communityResponse"
                    }
                }
            }
        },
        "http.communityCreateRequest": {
            "type": "object",
            "properties": {
                "community": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "http.communityResponse": {
            "type": "object",
            "properties": {
                "community": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "owner": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "http.matchResponse": {
            "type": "object",
            "properties": {
                "match": {
                    "type": "object",
                    "properties": {
                        "awayTeam": {
                            "$ref": "#/definitions/http.Team"
                        },
                        "gameTime": {
                            "type": "string"
                        },
                        "homeTeam": {
                            "$ref": "#/definitions/http.Team"
                        },
                        "id": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "http.matchUpdateRequest": {
            "type": "object",
            "properties": {
                "match": {
                    "type": "object",
                    "properties": {
                        "awayTeam": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "result": {
                                    "type": "integer"
                                }
                            }
                        },
                        "homeTeam": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "result": {
                                    "type": "integer"
                                }
                            }
                        }
                    }
                }
            }
        },
        "http.matchesResponse": {
            "type": "object",
            "properties": {
                "matches": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/http.matchResponse"
                    }
                }
            }
        },
        "http.rootResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "http.userResponse": {
            "type": "object",
            "properties": {
                "user": {
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string"
                        },
                        "firstName": {
                            "type": "string"
                        },
                        "id": {
                            "type": "string"
                        },
                        "lastName": {
                            "type": "string"
                        },
                        "username": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "securityDefinitions": {
        "OAuth2Implicit": {
            "type": "oauth2",
            "flow": "implicit",
            "authorizationUrl": "http://localhost:8080/realms/development/protocol/openid-connect/auth"
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "Check24 Tippspiel Challenge",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
