package mq

import (
	"context"
	"github.com/leon-liang/check24-tippspiel-challenge/server/kafka"
	kafkaGo "github.com/segmentio/kafka-go"
	"log"
)

type BetWriter struct {
	writer *kafkaGo.Writer
}

func NewBetWriter() *BetWriter {
	writer := kafka.NewWriter("bets")

	return &BetWriter{
		writer: writer,
	}
}

func (bw *BetWriter) WriteBets() {
	err := bw.writer.WriteMessages(context.Background(), kafkaGo.Message{
		Key:   []byte("bets"),
		Value: []byte("Hello World!"),
	})

	if err != nil {
		log.Println(err)
	}
}
