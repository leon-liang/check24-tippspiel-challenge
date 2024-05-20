package mq

import (
	"bytes"
	"context"
	"encoding/gob"
	"fmt"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
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

func (mw *MatchWriter) WriteMatches(match *model.Match) {

	// Encode match as gob
	var buf bytes.Buffer
	encoder := gob.NewEncoder(&buf)
	if err := encoder.Encode(match); err != nil {
		fmt.Println("An error has occurred while encoding: ", err)
	}

	err := mw.writer.WriteMessages(context.Background(), kafkaGo.Message{
		Key:   []byte("matches"),
		Value: buf.Bytes(),
	})

	if err != nil {
		fmt.Println("An Error has occurred: ", err)
	}
}
