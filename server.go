package main

import (
	"io/ioutil"
	"log"
	"net/http"
)

func startServer() {
	http.HandleFunc("/", handleAuthCode)
	http.HandleFunc("/companies", handleCompanies)
	log.Fatal(http.ListenAndServe(":"+server_port, nil))
	log.Printf("listening on port %s", server_port)
}

func handleAuthCode(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err.Error())
	}
	code := r.Form.Get("code")

	log.Println(code)

	getAccessToken(code)
}

func handleCompanies(w http.ResponseWriter, r *http.Request) {
	companies := getCompanies()
	comp, err := ioutil.ReadAll(companies)
	if err != nil {
		log.Fatal(err)
	}
	w.Write(comp)
}
