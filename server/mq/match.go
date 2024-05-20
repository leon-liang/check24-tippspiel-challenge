package mq

import (
	"context"
	"fmt"
	kafkaGo "github.com/segmentio/kafka-go"
)

type MatchWriter struct {
	writer *kafkaGo.Writer
}

func NewMatchWriter(mw *kafkaGo.Writer) *MatchWriter {
	return &MatchWriter{
		writer: mw,
	}
}

func (mw *MatchWriter) WriteMatches() {
	err := mw.writer.WriteMessages(context.Background(), kafkaGo.Message{
		Key:   []byte("matches"),
		Value: []byte("Hello World!"),
	})

	if err != nil {
		fmt.Println("An Error has occurred: ", err)
	}
}
