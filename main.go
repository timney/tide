package main

import (
	"fmt"
)

func main() {
	fmt.Printf("Tide api\n")
	loadApp()
}

func loadApp() {
	fmt.Println("starting server...")
	go startServer()
	fmt.Println("opening web app")
	openWebApp()
	select {}
}
