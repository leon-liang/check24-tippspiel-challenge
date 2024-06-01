# Check24 Tippspiel Challenge

This coding challenge is about a betting game for the soon-to-be happening European Championship 2024, which takes place in Germany beginning at the 14th of June 2024. The goal is to create a simple application that allows you and your friends to bet on the outcome of the games and to display the current standings of the participants.

## Demo
[![Check24 Gendev Video Demo](https://img.youtube.com/vi/qluAdJPu7o0/0.jpg)](https://www.youtube.com/watch?v=qluAdJPu7o0&ab_channel=LeonLiang)\
Link: [https://www.youtube.com/watch?v=qluAdJPu7o0&ab_channel=LeonLiang](https://www.youtube.com/watch?v=qluAdJPu7o0&ab_channel=LeonLiang)

## Respository Structure
This repository is a _mono repository_ combining both client- and serverside services.
- [client](client) holds the [Next.js](https://nextjs.org/) frontend for end users and administrators.
- [server](server) holds the [Go Echo](https://echo.labstack.com/) backend.
- [docker](docker) holds the Dockerfiles for all third party services:
  - [Keycloak](https://www.keycloak.org/) as an open source identity and access management solution.
  - [Postgresql](https://www.postgresql.org/) as an open source object-relational database solution.
  - [Kafka](https://kafka.apache.org/) as an open-source distributed event streaming platform.
  - [Redis](https://redis.io/) for managing task queues.

## Getting started
### Run the local development environment
1. Install & run [Docker Desktop](https://www.docker.com/)
1. Install [Task](https://taskfile.dev/installation/)
1. Copy `client/.env.local.example` to `client/.env.local`
1. Copy `server/.env.example` to `server/.env`
1. Run `task up`
1. The frontend is available at [http://localhost:3000](http://localhost:3000). 
   The backend is available at [http://localhost:8000](http://localhost:8000).
   The backend documentation is available at [http://localhost:8000/swagger/index.html](http://localhost:8000/swagger/index.html)

Use the following credentials to authenticate Swagger UI:

| OAuth2Implicit |           |
|----------------|-----------|
| client_id      | webclient |

Log in to the admin account using the details below:

| Username | Password |
|----------|----------|
| admin    | 123      |


