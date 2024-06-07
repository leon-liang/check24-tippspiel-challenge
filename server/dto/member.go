package dto

type Member struct {
	ID           string `json:"id"`
	Username     string `json:"username"`
	Points       int    `json:"points"`
	Position     int    `json:"position"`
	PrevPosition int    `json:"prevPosition"`
	Rank         int    `json:"rank"`
}

// Implement Comparable

type ByPosition []*Member

func (a ByPosition) Len() int {
	return len(a)
}

func (a ByPosition) Less(i, j int) bool {
	return a[i].Position > a[j].Position
}

func (a ByPosition) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}
