package workspace_controller

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"slack-like-app/dao/workspace_dao"
	"slack-like-app/model"
	"strings"
)

func RegisterWorkspaceHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

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

	var u model.WorkspaceReqForPost
	if err := json.Unmarshal(body, &u); err != nil {
		log.Printf("fail: json.Unmarshal, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println("ここからregister")
	response, err := workspace_dao.RegisterWorkspace(u)
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

func RegisterWorkspaceAndUserHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	path := r.URL.Path
	segments := strings.Split(path, "/")
	uid := segments[len(segments)-1]
	log.Println("uidは", uid)

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

	var u model.WorkspaceAndUserReqForPost
	if err := json.Unmarshal(body, &u); err != nil {
		log.Printf("fail: json.Unmarshal, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println("ここからregister")
	log.Println("workspaceIdは", u.WorkspaceId)
	response, err := workspace_dao.WorkspaceAndUserHandler(u, uid)
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

func FindWorkspaceWithUIdHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
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
	user_id := segments[len(segments)-1]
	log.Println("user_idは", user_id)

	if user_id == "" {
		log.Println("fail: uid is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	log.Println("user_id:", user_id)

	channels, err := workspace_dao.FindWorkspaceByUserId(user_id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Println("ok getworkspacebyuid", channels)

	bytes, err := json.Marshal(channels)
	if err != nil {
		log.Printf("fail: json.Marshal, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Println("ok bytesofworkspace", bytes)
	log.Println("変換終了 bytes", bytes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}

func FindAllWorkspaceHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
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
	user_id := segments[len(segments)-1]

	if user_id == "" {
		log.Println("fail: uid is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	log.Println("user_id:", user_id)

	channels, err := workspace_dao.FindAllWorkspace()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Println("ok getworkspacebyuid", channels)

	bytes, err := json.Marshal(channels)
	if err != nil {
		log.Printf("fail: json.Marshal, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Println("ok bytesofworkspace", bytes)
	log.Println("変換終了 bytes", bytes)
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
}
