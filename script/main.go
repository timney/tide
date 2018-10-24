package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"sort"
	"strconv"
	"time"

	"github.com/olekukonko/tablewriter"
)

func main() {
	readTransactions()
}

type Transaction struct {
	TransactionId int     `json:"transactionId"`
	Amount        float64 `json:"amount"`
	Type          string  `json:"type"`
	Created       string  `json:"isoTransactionDateTime"`
	Category      string  `json:"categoryName"`
	CategoryType  string  `json:"categoryType"`
}

type TableRow struct {
	data   string
	amount float64
	total  float64
}

const file_name = "../transactions.json"

func readTransactions() {
	file, err := ioutil.ReadFile(file_name)
	if err != nil {
		log.Fatal(err)
	}

	var transactions []Transaction
	ferr := json.Unmarshal(file, &transactions)
	if ferr != nil {
		log.Fatal(ferr)
	}

	sort.Slice(transactions, func(i, j int) bool {
		firstDate, _ := time.Parse(time.RFC3339, transactions[i].Created)
		secondDate, _ := time.Parse(time.RFC3339, transactions[j].Created)
		return firstDate.Before(secondDate)
	})

	rows := make([][]string, len(transactions))
	var total float64

	for _, v := range transactions {
		total = total + v.Amount
		log.Println(total)
		amou := strconv.FormatFloat(v.Amount, 'f', 2, 64)
		tot := strconv.FormatFloat(total, 'f', 2, 64)
		cre, _ := time.Parse(time.RFC3339, v.Created)
		rows = append(rows, []string{cre.Format(time.UnixDate), amou, tot})
	}

	printTable(rows, total)
}

func printTable(rows [][]string, total float64) {
	tot := strconv.FormatFloat(total, 'f', 2, 64)
	table := tablewriter.NewWriter(os.Stdout)
	table.SetHeader([]string{"Date", "Amount", "Total"})
	table.SetFooter([]string{"", "Total", tot})
	table.AppendBulk(rows)
	table.Render()
}
