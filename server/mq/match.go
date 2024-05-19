package mq

import (
	"context"
	kafkaGo "github.com/segmentio/kafka-go"
	"log"
)

type MatchMQ struct {
	writer *kafkaGo.Writer
	reader *kafkaGo.Reader
}

func NewMatchMQ(mw *kafkaGo.Writer, mr *kafkaGo.Reader) *MatchMQ {
	return &MatchMQ{
		writer: mw,
		reader: mr,
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
