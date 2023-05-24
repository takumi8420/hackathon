package messages_controller

import (
	"encoding/json"
	"log"
	"net/http"
	"slack-like-app/dao/message_dao"
	"strings"
)

func FindMessagesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	path := r.URL.Path
	segments := strings.Split(path, "/")
	uid := segments[len(segments)-1]
	//log.Print(uid)

	if uid == "" {
		log.Println("fail: uid is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	messages, err := message_dao.FindMesssagesById(uid)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Print("ok getuserbyname user", messages)

	bytes, err := json.Marshal(messages)
	if err != nil {
		log.Printf("fail: json.Marshal, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Print("変換終了 bytes", bytes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}