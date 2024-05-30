package mq

import (
	"bytes"
	"context"
	"encoding/gob"
	"fmt"
	"github.com/leon-liang/check24-tippspiel-challenge/server/model"
	kafkaGo "github.com/segmentio/kafka-go"
)

type JobWriter struct {
	writer *kafkaGo.Writer
}

func NewJobWriter(jw *kafkaGo.Writer) *JobWriter {
	return &JobWriter{
		writer: jw,
	}
}

func (jw *JobWriter) WriteJob(job *model.Job) {
	// Encode job as gob
	var buf bytes.Buffer
	encoder := gob.NewEncoder(&buf)
	if err := encoder.Encode(job); err != nil {
		fmt.Println("An error has occurred while encoding: ", err)
	}

	err := jw.writer.WriteMessages(context.Background(), kafkaGo.Message{
		Key:   []byte(job.Name),
		Value: buf.Bytes(),
	})

	if err != nil {
		fmt.Println("An Error has occurred: ", err)
	}
}
