package message_dao

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"os"
	"slack-like-app/model"
)

var db *sql.DB

func init() {
	// ①-1 環境変数を用いる

	mysqlUser := os.Getenv("MYSQL_USER")
	mysqlPwd := os.Getenv("MYSQL_PWD")
	mysqlHost := os.Getenv("MYSQL_HOST")
	mysqlDatabase := os.Getenv("MYSQL_DATABASE")

	connStr := fmt.Sprintf("%s:%s@%s/%s", mysqlUser, mysqlPwd, mysqlHost, mysqlDatabase)
	_db, err := sql.Open("mysql", connStr)

	// ①-2
	//_db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@(localhost:3306)/%s", mysqlUser, mysqlPwd, mysqlDatabase))
	if err != nil {
		log.Fatalf("fail: sql.Open, %v\n", err)
	}
	// ①-3
	if err := _db.Ping(); err != nil {
		log.Fatalf("fail: _db.Ping, %v\n", err)
	}
	db = _db
}

func CloseDB() error {
	return db.Close()
}

func FindMessagesById(userId string) ([]model.MessagesResForGet, error) {

	rows, err := db.Query("SELECT user.user_name, message.message_id, message.channel_id, message.user_id, message.contents, message.created_at, message.is_edited FROM messages LEFT JOIN user ON message.user_id = user.user_id WHERE message.user_id = ?", userId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	log.Print("読み取れてはいます")
	log.Print("rows:", rows)

	messages := make([]model.MessagesResForGet, 0)
	var i = -1
	for rows.Next() {
		i += 1
		var u model.MessagesResForGet
		if err := rows.Scan(&u.UserName, &u.MessageId, &u.ChannelId, &u.UserId, &u.Contents, &u.CreatedAt, &u.IsEdited); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
				log.Printf("fail: rows.Close(), %v\n", err)
				//w.WriteHeader(http.StatusInternalServerError)
				//return
			}
		}
		messages = append(messages, u)
	}
	log.Print("u:", messages)
	return messages, nil
}

func FindMessagesByChannel(channelId string) (*[]model.MessagesResForGet, error) {

	rows, err := db.Query("SELECT user.user_name, message.message_id, message.channel_id, message.user_id, message.content, message.created_at, message.is_edited FROM message LEFT JOIN user ON message.user_id = user.user_id WHERE message.channel_id = ?", channelId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	log.Print("読み取れてはいます")
	log.Print("rows:", rows)

	messages := make([]model.MessagesResForGet, 0)
	var i = -1
	for rows.Next() {
		i += 1
		var u model.MessagesResForGet
		if err := rows.Scan(&u.UserName, &u.MessageId, &u.ChannelId, &u.UserId, &u.Contents, &u.CreatedAt, &u.IsEdited); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			//if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
			//	log.Printf("fail: rows.Close(), %v\n", err)
			//w.WriteHeader(http.StatusInternalServerError)
			//return
			//}
		}
		messages = append(messages, u)
		log.Print("u:", messages)
	}
	if err := rows.Err(); err != nil {
		log.Printf("fail: rows.Err(), %v\n", err)
		// エラーハンドリングの処理を追加することが望ましいです
	}
	if err := rows.Close(); err != nil {
		log.Printf("fail: rows.Close(), %v\n", err)
		// エラーハンドリングの処理を追加することが望ましいです
	}
	log.Print("u:", messages)
	return &messages, nil
}
