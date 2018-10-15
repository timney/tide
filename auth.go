package main

import (
	"log"
	"os/exec"
	"runtime"
)

const server_port = "8899"
const redirect_url = "http://localhost:" + server_port
const client_id = "TidePersonalApi"
const auth_url = "https://api.tide.co/tide-backend/oauth/index.html?redirect_url=" + redirect_url + "&client_id=" + client_id

// Open tide url in browser

func open(url string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start"}
	case "darwin":
		cmd = "open"
	default: // "linux", "freebsd", "openbsd", "netbsd"
		cmd = "xdg-open"
	}
	args = append(args, url)
	return exec.Command(cmd, args...).Start()
}

func openTideLogin() {
	err := open(auth_url)
	if err != nil {
		log.Println(err.Error())
	}
}
