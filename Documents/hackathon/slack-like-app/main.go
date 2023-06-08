package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"
	"slack-like-app/controller/channel_controller"
	"slack-like-app/controller/messages_controller"
	"slack-like-app/controller/user_controller"
	"slack-like-app/controller/workspace_controller"
	"slack-like-app/dao/message_dao"
	"syscall"
)

func main() {
	// ② /userでリクエストされたらnameパラメーターと一致する名前を持つレコードをJSON形式で返す
	//fmt.Print("ok")

	http.HandleFunc("/search_user/", user_controller.SearchUserHandler)
	http.HandleFunc("/register_user/", user_controller.RegisterUserHandler)
	http.HandleFunc("/get_messages_with_user_id/", messages_controller.FindMessagesWithUserIdHandler)
	http.HandleFunc("/get_messages_with_channel_id/", messages_controller.FindMessagesWithChannelIdHandler)
	http.HandleFunc("/send_messages/", messages_controller.SendMessagesHandler)
	http.HandleFunc("/edit_messages/", messages_controller.EditMessagesHandler)
	http.HandleFunc("/delete_messages/", messages_controller.DeleteMessagesHandler)
	http.HandleFunc("/register_channel/", channel_controller.RegisterChannelHandler)
	http.HandleFunc("/register_workspace/", workspace_controller.RegisterWorkspaceHandler)
	http.HandleFunc("/register_channel_and_user/", user_controller.RegisterUserAndChannelHandler)
	http.HandleFunc("/register_workspace_and_user/", user_controller.RegisterUserAndWorkspaceHandler)
	http.HandleFunc("/get_channel_with_workspace_id/", channel_controller.FindChannelWithWorkspaceIdHandler)
	http.HandleFunc("/get_workspace_with_user_id/", workspace_controller.FindWorkspaceWithUIdHandler)

	// ③ Ctrl+CでHTTPサーバー停止時にDBをクローズする
	closeDBWithSysCall()

	// 8000番ポートでリクエストを待ち受ける
	log.Println("Listening...")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}
}

// ③ Ctrl+CでHTTPサーバー停止時にDBをクローズする
func closeDBWithSysCall() {
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGTERM, syscall.SIGINT)
	go func() {
		s := <-sig
		log.Printf("received syscall, %v", s)

		if err := message_dao.CloseDB(); err != nil {
			log.Fatal(err)
		}
		log.Printf("success: dao.CloseDB()")
		os.Exit(0)
	}()
}
