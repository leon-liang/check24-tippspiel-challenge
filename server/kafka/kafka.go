package kafka

import (
	"fmt"
	"github.com/segmentio/kafka-go"
)

func NewConn() *kafka.Conn {
	conn, err := kafka.Dial("tcp", "kafka:9092")
	if err != nil {
		fmt.Println(err.Error())
	}

	return conn
}

func CreateTopic(c *kafka.Conn, topic string) {
	topicConfigs := []kafka.TopicConfig{
		{
			Topic:             topic,
			NumPartitions:     1,
			ReplicationFactor: 1,
		},
	}
	err := c.CreateTopics(topicConfigs...)
	if err != nil {
		fmt.Println(err.Error())
	}
}

func NewWriter(topic string) *kafka.Writer {
	writer := kafka.Writer{
		Addr:                   kafka.TCP("kafka:9092", "kafka:9093", "kafka:9094"),
		Topic:                  topic,
		Balancer:               &kafka.LeastBytes{},
		AllowAutoTopicCreation: true,
	}

	return &writer
}

func NewReader(topic string) *kafka.Reader {
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{"kafka:9092", "kafka:9093", "kafka:9094"},
		Topic:     topic,
		Partition: 0,
		MinBytes:  1,
		MaxBytes:  10e6,
	})

	return reader
}
