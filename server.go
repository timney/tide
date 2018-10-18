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
}

func handleCompanies(w http.ResponseWriter, r *http.Request) {
	companies := getCompanies()
	comp, err := ioutil.ReadAll(companies)
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Add("Content-Type", "application/json")
	enableCors(&w)
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

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
