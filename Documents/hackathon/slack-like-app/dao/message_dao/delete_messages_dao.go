package message_dao

import (
	"log"
	"slack-like-app/model"
)

func DeleteMessages(messageData model.MessagesReqForDelete) (model.MessagesResForDelete, error) {
	//t := time.Now()
	//entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	//id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	//// log.Println("uid:", uid)
	//log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.MessagesResForDelete{}, err
	}
	defer tx.Rollback()

	log.Println("ここからdelete")

	_, err = tx.Exec("DELETE FROM message WHERE message_id = ?", messageData.MessageId)

	if err != nil {
		log.Println(err)
		return model.MessagesResForDelete{}, err
	}
	log.Println("done delete")

	if err := tx.Commit(); err != nil {
		return model.MessagesResForDelete{}, err
	}

	return model.MessagesResForDelete{MessageId: messageData.MessageId}, nil
}
