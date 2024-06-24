FROM golang:alpine3.18 as development

RUN apk add -U tzdata
ENV TZ=Europe/Paris
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

ENV PROJECT_DIR=/app \
    GO111MODULE=on \
    CGO_ENABLED=0

WORKDIR /app
RUN mkdir "/build"

COPY go.mod go.sum ./
RUN go mod download

COPY ./ ./

RUN go get github.com/githubnemo/CompileDaemon
RUN go install github.com/githubnemo/CompileDaemon

EXPOSE 8000

FROM golang:alpine3.18

ENV PROJECT_DIR=/app \
    CGO_ENABLED=0

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY ./ ./

RUN go build -o /server /app/cmd/app/main.go

EXPOSE 8000

CMD ["/server"]
