package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func startServer() {
	dir, _ := os.Getwd()
	fs := http.FileServer(http.Dir(filepath.Join(dir, "web", "dist")))
	http.Handle("/", fs)
	http.HandleFunc("/code", handleAuthCode)
	http.HandleFunc("/companies", handleCompanies)
	http.HandleFunc("/accounts", handleAccounts)
	http.HandleFunc("/transactions", handleTransactions)
	log.Fatal(http.ListenAndServe(":"+server_port, nil))
	log.Printf("listening on port %s", server_port)
}

func handleAuthCode(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err.Error())
	}
	code := r.Form.Get("code")
	if len(code) < 1 {
		w.WriteHeader(400)
		log.Println("Missing code")
		return
	}
	log.Println(code)

	getAccessToken(code)
}

func handleCompanies(w http.ResponseWriter, r *http.Request) {
	companies := getCompanies()
	comp, err := ioutil.ReadAll(companies)
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Add("Content-Type", "application/json")
	w.Write(comp)
}

func handleAccounts(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err.Error())
	}
	company_id := r.Form.Get("companyId")

	accounts, err := ioutil.ReadAll(getAccounts(company_id))
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Add("Content-Type", "application/json")
	w.Write(accounts)
}

func handleTransactions(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err.Error())
	}
	account_id := r.Form.Get("accountId")

	transactions, err := ioutil.ReadAll(getTransactions(account_id))
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Add("Content-Type", "application/json")
	w.Write(transactions)
}
