package dtos

type Member struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Points   int    `json:"points"`
	Rank     int    `json:"rank"`
}