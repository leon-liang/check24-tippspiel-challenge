package model

type Community struct {
	Name    string
	Owner   User
	Members []User
}
