package message_dao

import (
	"log"
	"slack-like-app/model"
)

func EditMessages(messageData model.MessagesReqForEdit) (model.MessagesResForEdit, error) {
	//t := time.Now()
	//entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	//id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	//// log.Println("uid:", uid)
	//log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.MessagesResForEdit{}, err
	}
	defer tx.Rollback()

	log.Println("ここからedit")
	log.Println("editの内容：", messageData.MessageId, messageData.Contents)

	_, err = tx.Exec("UPDATE message SET content = ?, is_edited = 1 WHERE message_id = ?", messageData.Contents, messageData.MessageId)

	if err != nil {
		log.Println(err)
		return model.MessagesResForEdit{}, err
	}
	log.Println("ok user table")
	//
	//log.Println(id, messageData.ChannelId, messageData.UserId, messageData.Contents, t)

	if err := tx.Commit(); err != nil {
		return model.MessagesResForEdit{}, err
	}

	return model.MessagesResForEdit{MessageId: messageData.MessageId, Contents: messageData.Contents}, nil
}
