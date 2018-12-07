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
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println(filepath.Join(dir, "web", "dist", "index.html"))
		http.ServeFile(w, r, filepath.Join(dir, "web", "dist", "index.html"))
	})
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
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Missing code")
		return
	}
	log.Println(code)
	getAccessToken(code)

	// redirect
	http.Redirect(w, r, "/", http.StatusMovedPermanently)
}

var companies []byte
var accountsMap map[string][]byte
var transactionsMap map[string][]byte

func handleCompanies(w http.ResponseWriter, r *http.Request) {
	companiesReader := getCompanies()
	if companies == nil {
		var err error
		companies, err = ioutil.ReadAll(companiesReader)
		if err != nil {
			log.Fatal(err)
		}
	}
	w.Header().Add("Content-Type", "application/json")
	enableCors(&w)
	w.Write(companies)
}

func handleAccounts(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err.Error())
	}
	company_id := r.Form.Get("companyId")
	if accountsMap == nil {
		accountsMap = make(map[string][]byte)
	}

	if accountsMap[company_id] == nil {
		accounts, err := ioutil.ReadAll(getAccounts(company_id))
		if err != nil {
			log.Fatal(err)
		}
		accountsMap[company_id] = accounts
	}
	w.Header().Add("Content-Type", "application/json")
	enableCors(&w)
	w.Write(accountsMap[company_id])
}

func handleTransactions(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err.Error())
	}
	account_id := r.Form.Get("accountId")
	if transactionsMap == nil {
		transactionsMap = make(map[string][]byte)
	}
	if accountsMap[account_id] == nil {
		transactions, err := ioutil.ReadAll(getTransactions(account_id))
		if err != nil {
			log.Fatal(err)
		}
		accountsMap[account_id] = transactions
	}
	w.Header().Add("Content-Type", "application/json")
	enableCors(&w)
	w.Write(accountsMap[account_id])
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
