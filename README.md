# Check24 Tippspiel Challenge

## Link to Demo
[![Check24 Gendev Video Demo](https://img.youtube.com/vi/qluAdJPu7o0/0.jpg)](https://www.youtube.com/watch?v=qluAdJPu7o0&ab_channel=LeonLiang)

## Respository Structure
This repository is a _mono repository_ combining both client- and serverside services.
- [client](client) holds the [Next.js](https://nextjs.org/) frontend for end users and administrators
- [server](server) holds the [Go Echo](https://echo.labstack.com/) backend
- [docker](docker) holds the Dockerfiles for all third party dependencies

## Getting started
### Run the local development environment
1. Install & run [Docker Desktop](https://www.docker.com/)
1. Install [Task](https://taskfile.dev/installation/)
1. Copy `client/.env.local.example` to `client/.env.local`
1. Copy `server/.env.example` to `server/.env`
1. Run `task up`
1. The frontend is available at [http://localhost:3000](http://localhost:3000). 
   The backend is available at [http://localhost:8000](http://localhost:8000).