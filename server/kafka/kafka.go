package kafka

import (
	"fmt"
	"github.com/segmentio/kafka-go"
	"os"
)

func NewConn(topic string) *kafka.Conn {
	kafkaHost := os.Getenv("KAFKA_HOST")
	kafkaPort := os.Getenv("KAFKA_PORT")

	conn, err := kafka.Dial("tcp", kafkaHost+":"+kafkaPort)
	if err != nil {
		fmt.Println(err.Error())
	}

	topicConfigs := []kafka.TopicConfig{
		{
			Topic:             topic,
			NumPartitions:     1,
			ReplicationFactor: 1,
		},
	}
	if err := conn.CreateTopics(topicConfigs...); err != nil {
		fmt.Println(err.Error())
	}

	return conn
}

func NewWriter(topic string) *kafka.Writer {
	kafkaHost := os.Getenv("KAFKA_HOST")
	kafkaPort := os.Getenv("KAFKA_PORT")

	writer := kafka.Writer{
		Addr:                   kafka.TCP(kafkaHost + ":" + kafkaPort),
		Topic:                  topic,
		Balancer:               &kafka.LeastBytes{},
		AllowAutoTopicCreation: true,
	}

	return &writer
}

func NewReader(topic string) *kafka.Reader {
	kafkaHost := os.Getenv("KAFKA_HOST")
	kafkaPort := os.Getenv("KAFKA_PORT")

	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{kafkaHost + ":" + kafkaPort},
		Topic:     topic,
		Partition: 0,
		MinBytes:  1,
		MaxBytes:  10e6,
	})

	return reader
}
