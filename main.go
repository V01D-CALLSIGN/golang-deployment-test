package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// Response struct for JSON response
type Response struct {
	Message string `json:"message"`
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	resp := Response{Message: "Hello, World!"}

	// encode struct to JSON and send as response
	json.NewEncoder(w).Encode(resp)
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)

	log.Println("Starting API server on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
