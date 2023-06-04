package messages_controller

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"slack-like-app/dao/message_dao"
	"slack-like-app/model"
)

func SendMessagesHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	//path := r.URL.Path
	//segments := strings.Split(path, "/")
	//uid := segments[len(segments)-1]
	////log.Println("path:", segments)
	////fmt.Print(uid)
	////log.Println("uid:", uid)
	//
	//if uid == "" {
	//	log.Println("fail: uid is empty")
	//	w.WriteHeader(http.StatusBadRequest)
	//	return
	//}

	if r.Method != http.MethodPost {
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	contentType := r.Header.Get("Content-Type")
	if contentType != "application/json" {
		log.Println("fail: Content-Type is not application/json")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		log.Printf("fail: ioutil.ReadAll, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var u model.MessagesReqForPost
	if err := json.Unmarshal(body, &u); err != nil {
		log.Printf("fail: json.Unmarshal, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Println("ここからregister")

	response, err := message_dao.SendMessages(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println("register終了")

	responseBody, err := json.Marshal(response)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(responseBody)
}
