package http

import (
	"github.com/leon-liang/check24-tippspiel-challenge/server/dtos"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	"sort"
	"time"
)

type rootResponse struct {
	Message string `json:"message"`
}

func newRootResponse(message string) *rootResponse {
	r := new(rootResponse)
	r.Message = message

	return r
}

type userResponse struct {
	User struct {
		ID        string `json:"id"`
		Username  string `json:"username"`
		Email     string `json:"email"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		Points    int    `json:"points"`
	} `json:"user"`
}

func newUserResponse(u *model.User) *userResponse {
	r := new(userResponse)
	r.User.ID = u.ID
	r.User.Username = u.Username
	r.User.Email = u.Email
	r.User.FirstName = u.FirstName
	r.User.LastName = u.LastName
	r.User.Points = u.Points
	return r
}

type usersResponse struct {
	Users []userResponse `json:"users"`
}

func newUsersResponse(users []*model.User) *usersResponse {
	r := new(usersResponse)
	ur := userResponse{}

	r.Users = make([]userResponse, 0)
	for _, u := range users {
		ur.User.ID = u.ID
		ur.User.Email = u.Email
		ur.User.Username = u.Username
		ur.User.FirstName = u.FirstName
		ur.User.LastName = u.LastName

		r.Users = append(r.Users, ur)
	}

	return r
}

type communityResponse struct {
	Community struct {
		ID    string `json:"id"`
		Owner string `json:"owner"`
		Name  string `json:"name"`
	} `json:"community"`
}

func newCommunityResponse(c *model.Community) *communityResponse {
	r := new(communityResponse)
	r.Community.ID = c.ID
	r.Community.Owner = c.Owner
	r.Community.Name = c.Name

	return r
}

type communitiesResponse struct {
	Communities []communityResponse `json:"communities"`
}

func newCommunitiesResponse(communities []model.Community) *communitiesResponse {
	r := new(communitiesResponse)
	cr := communityResponse{}

	r.Communities = make([]communityResponse, 0)
	for _, c := range communities {
		cr.Community.ID = c.ID
		cr.Community.Owner = c.Owner
		cr.Community.Name = c.Name

		r.Communities = append(r.Communities, cr)
	}

	return r
}

type communityLeaderboardResponse struct {
	CommunityLeaderboard struct {
		ID      string        `json:"id"`
		Name    string        `json:"name"`
		Members []dtos.Member `json:"members"`
	} `json:"communityLeaderboard"`
}

func newCommunityLeaderboardResponse(community *model.Community, members []*dtos.Member) *communityLeaderboardResponse {
	r := new(communityLeaderboardResponse)
	m := dtos.Member{}

	r.CommunityLeaderboard.ID = community.ID
	r.CommunityLeaderboard.Name = community.Name

	r.CommunityLeaderboard.Members = make([]dtos.Member, 0)
	for _, member := range members {
		m.ID = member.ID
		m.Username = member.Username
		m.Points = member.Points
		m.Rank = member.Rank
		m.Position = member.Position

		r.CommunityLeaderboard.Members = append(r.CommunityLeaderboard.Members, m)
	}

	return r
}

type userCommunitiesLeaderboardResponse struct {
	CommunityPreviews []communityLeaderboardResponse `json:"communityLeaderboard"`
}

func newUserCommunitiesLeaderboardResponse(communityPreviews []*communityLeaderboardResponse) *userCommunitiesLeaderboardResponse {
	r := new(userCommunitiesLeaderboardResponse)
	cp := communityLeaderboardResponse{}

	r.CommunityPreviews = make([]communityLeaderboardResponse, 0)
	for _, communityPreview := range communityPreviews {
		cp.CommunityLeaderboard.ID = communityPreview.CommunityLeaderboard.ID
		cp.CommunityLeaderboard.Name = communityPreview.CommunityLeaderboard.Name
		cp.CommunityLeaderboard.Members = communityPreview.CommunityLeaderboard.Members

		r.CommunityPreviews = append(r.CommunityPreviews, cp)
	}

	return r
}

type Team struct {
	Name   *string `json:"name"`
	Result *int    `json:"result"`
}

type matchResponse struct {
	Match struct {
		ID              string    `json:"id"`
		HomeTeam        Team      `json:"homeTeam"`
		AwayTeam        Team      `json:"awayTeam"`
		GameTime        time.Time `json:"gameTime"`
		ResultUpdatedAt time.Time `json:"resultUpdatedAt"`
		PointsUpdatedAt time.Time `json:"pointsUpdatedAt"`
	} `json:"match"`
}

func newMatchResponse(match model.Match) *matchResponse {
	r := new(matchResponse)
	ht := Team{}
	at := Team{}

	if match.HomeTeam != nil {
		ht.Name = &match.HomeTeam.Name
		ht.Result = match.HomeTeamResult
	}

	if match.AwayTeam != nil {
		at.Name = &match.AwayTeam.Name
		at.Result = match.AwayTeamResult
	}

	r.Match.ID = match.ID
	r.Match.HomeTeam = ht
	r.Match.AwayTeam = at
	r.Match.GameTime = match.GameTime
	r.Match.ResultUpdatedAt = match.ResultUpdatedAt

	return r
}

type matchesResponse struct {
	Matches []matchResponse `json:"matches"`
}

func newMatchesResponse(matches []model.Match) *matchesResponse {
	r := new(matchesResponse)
	mr := matchResponse{}

	r.Matches = make([]matchResponse, 0)
	for _, m := range matches {
		mr = *newMatchResponse(m)
		r.Matches = append(r.Matches, mr)
	}

	sortByGameTime := func(i, j int) bool {
		timeI := r.Matches[i].Match.GameTime
		timeJ := r.Matches[j].Match.GameTime
		return timeI.Before(timeJ)
	}

	sort.Slice(r.Matches, sortByGameTime)

	return r
}

type betResponse struct {
	Bet struct {
		ID       string        `json:"id"`
		HomeTeam *int          `json:"homeTeam"`
		AwayTeam *int          `json:"awayTeam"`
		Match    matchResponse `json:"match"`
	} `json:"bet"`
}

func newBetResponse(bet model.Bet) *betResponse {
	r := new(betResponse)
	mr := matchResponse{}
	mr = *newMatchResponse(bet.Match)

	if bet.HomeTeam != nil {
		r.Bet.HomeTeam = bet.HomeTeam
	}

	if bet.AwayTeam != nil {
		r.Bet.AwayTeam = bet.AwayTeam
	}

	r.Bet.ID = bet.ID
	r.Bet.Match = mr
	return r
}

type betsResponse struct {
	Bets []betResponse `json:"bets"`
}

func newBetsResponse(bets []model.Bet) *betsResponse {
	r := new(betsResponse)
	br := betResponse{}

	r.Bets = make([]betResponse, 0)

	for _, bet := range bets {
		br = *newBetResponse(bet)
		r.Bets = append(r.Bets, br)
	}

	sortByGameTime := func(i, j int) bool {
		timeI := r.Bets[i].Bet.Match.Match.GameTime
		timeJ := r.Bets[j].Bet.Match.Match.GameTime
		return timeI.Before(timeJ)
	}

	sort.Slice(r.Bets, sortByGameTime)

	return r
}

type jobResponse struct {
	Job struct {
		ID          string    `json:"id"`
		Name        string    `json:"name"`
		CompletedAt time.Time `json:"completedAt"`
	} `json:"job"`
}

func newJobResponse(job model.Job) *jobResponse {
	r := new(jobResponse)

	r.Job.ID = job.ID
	r.Job.Name = job.Name
	r.Job.CompletedAt = job.CompletedAt

	return r
}
