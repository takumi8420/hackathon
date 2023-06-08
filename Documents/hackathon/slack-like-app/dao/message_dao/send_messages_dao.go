package message_dao

import (
	"github.com/oklog/ulid/v2"
	"log"
	"math/rand"
	"slack-like-app/model"
	"time"
)

func SendMessages(messageData model.MessagesReqForPost) (model.MessagesResForPost, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	// log.Println("uid:", uid)
	log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.MessagesResForPost{}, err
	}
	defer tx.Rollback()

	initialBool := 0

	log.Println("ここからinsert")
	log.Println("insertの内容：", id, messageData.ChannelId, messageData.UserId, messageData.Contents, t.Format("2006-01-02 15:04:05"), initialBool)

	_, err = tx.Exec("INSERT INTO message (message_id, channel_id, user_id, content, created_at, is_edited) VALUES (?, ?, ?, ?, ?, ?)", id, messageData.ChannelId, messageData.UserId, messageData.Contents, t.Format("2006-01-02 15:04:05"), initialBool)
	if err != nil {
		log.Println(err)
		return model.MessagesResForPost{}, err
	}
	log.Println("ok user table")

	log.Println(id, messageData.ChannelId, messageData.UserId, messageData.Contents, t)

	if err := tx.Commit(); err != nil {
		return model.MessagesResForPost{}, err
	}

	return model.MessagesResForPost{MessageId: id, ChannelId: messageData.ChannelId, UserId: messageData.UserId, Contents: messageData.Contents}, nil
}
