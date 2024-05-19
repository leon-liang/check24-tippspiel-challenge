package kafka

import "github.com/segmentio/kafka-go"

func NewWriter(topic string) *kafka.Writer {
	writer := kafka.Writer{
		Addr:                   kafka.TCP("kafka:9092"),
		Topic:                  topic,
		Balancer:               &kafka.LeastBytes{},
		AllowAutoTopicCreation: true,
	}

	return &writer
}
