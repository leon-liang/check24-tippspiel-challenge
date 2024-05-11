package utils

import (
	"encoding/csv"
	"log"
	"os"
)

func ReadCsvFile(filePath string, comma rune) [][]string {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal("Unable to read input file: "+filePath, err)
	}
	defer f.Close()

	reader := csv.NewReader(f)
	reader.Comma = comma
	data, err := reader.ReadAll()
	if err != nil {
		log.Fatal("Unable to parse file "+filePath+" as csv", err)
	}

	return data
}
