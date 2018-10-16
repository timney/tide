package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

const file_name = "access_tokens.json"

func saveTokensFile(tokens Token) {
	jsono, err := json.Marshal(tokens)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(len(jsono))

	rerr := os.Remove(file_name)
	if rerr != nil {
		log.Println(rerr)
	}

	error := ioutil.WriteFile(file_name, jsono, 0644)
	if error != nil {
		log.Println(error)
	}
}

func hasAccessTokens() bool {
	_, err := os.Stat(file_name)
	if err != nil {
		if os.IsNotExist(err) {
			return false
		}
	}
	return true
}

func readAccessToken() Token {
	file, err := ioutil.ReadFile(file_name)
	if err != nil {
		log.Fatal(err)
	}

	var tokens Token
	ferr := json.Unmarshal(file, &tokens)
	if ferr != nil {
		log.Fatal(ferr)
	}
	return tokens
}
