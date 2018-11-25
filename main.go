package main

import (
	"fmt"
)

func main() {
	fmt.Printf("Tide api\n")
	loadApp()
}

func loadApp() {
	go startServer()
	openWebApp()
	select {}
}
