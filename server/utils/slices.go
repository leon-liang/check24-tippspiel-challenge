package utils

func Unique[T comparable](inputSlice []*T) []*T {
	uniqueSlice := make([]*T, 0, len(inputSlice))
	seen := make(map[T]bool, len(inputSlice))
	for _, element := range inputSlice {
		if !seen[*element] {
			uniqueSlice = append(uniqueSlice, element)
			seen[*element] = true
		}
	}
	return uniqueSlice
}
