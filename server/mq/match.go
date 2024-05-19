package mq

import (
	"context"
	"github.com/leon-liang/check24-tippspiel-challenge/server/kafka"
	kafkaGo "github.com/segmentio/kafka-go"
	"log"
)

type MatchMQ struct {
	writer *kafkaGo.Writer
	reader *kafkaGo.Reader
}

func NewMatchMQ() *MatchMQ {
	topic := "matches"

	writer := kafka.NewWriter(topic)
	reader := kafka.NewReader(topic)

	return &MatchMQ{
		writer: writer,
		reader: reader,
	}
}

func (mmq *MatchMQ) WriteMatches() {
	err := mmq.writer.WriteMessages(context.Background(), kafkaGo.Message{
		Key:   []byte("matches"),
		Value: []byte("Hello World!"),
	})

	if err != nil {
		log.Println(err)
	}
}
