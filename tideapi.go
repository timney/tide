package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

const token_url = "https://api.tide.co/tide-backend/rest/api/v1/oauth2/tokens?code="
const companies_url = "https://api.tide.co/tide-backend/rest/api/v1/external/companies"

type Token struct {
	Access_token  string `json:"access_token"`
	Refresh_token string `json:"refresh_token"`
}

func getUrl(code string) string {
	return token_url + code
}

func getAccessToken(code string) Token {
	resp, err := http.Get(getUrl(code))
	if err != nil {
		log.Println(err.Error())
	}
	decoder := json.NewDecoder(resp.Body)
	var tokens Token
	terr := decoder.Decode(&tokens)
	resp.Body.Close()
	if terr != nil {
		log.Fatal(terr)
	}

	saveTokensFile(tokens)

	return tokens
}

func getCompanies() io.ReadCloser {
	log.Println("get companies")
	tokens := readAccessToken()

	client := &http.Client{}

	req, err := http.NewRequest("GET", companies_url, nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(tokens.Access_token)
	req.Header.Add("Authorization", "Bearer "+tokens.Access_token)
	resp, rerr := client.Do(req)
	if rerr != nil {
		log.Fatal(rerr)
	}

	return resp.Body
}
