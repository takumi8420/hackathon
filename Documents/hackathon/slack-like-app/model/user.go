package model

import "time"

type UserResForHTTPGet struct {
	Id   string `json:"user_id"`
	Name string `json:"user_name"`
	Age  int    `json:"age"`
}

type UserReqForHTTPPost struct {
	Name string `json:"name"`
	Age  int64  `json:"age"`
}

type UserResForHTTPPost struct {
	Id string `json:"id"`
}

type MessagesResForGet struct {
	MessageId string    `json:"message_id"`
	ChannalId string    `json:"channel_id"`
	UserId    string    `json:"user_id"`
	Contents  string    `json:"contents"`
	CreatedAt time.Time `json:"created_at"`
	UserName string			`json:"user_name"`
}

type MessagesReqForPost struct {
	// MessageId string    `json:"message_id"`
	ChannelId string    `json:"channel_id"`
	UserId    string    `json:"user_id"`
	Contents  string    `json:"contents"`
	// CreatedAt time.Time `json:"created_at"`
	UserName string			`json:"user_name"`
}

type MessagesResForPost struct {
	MessageId string    `json:"message_id"`
	ChannelId string    `json:"channel_id"`
	UserId    string    `json:"user_id"`
	Contents  string    `json:"contents"`
	CreatedAt time.Time `json:"created_at"`
	UserName string			`json:"user_name"`
}

type ChannelReqForPost struct{
	ChannelName string    `json:"channel_name"`
	WorkspaceId string    `json:"workspace_id"`
}

type WorkspaceReqForPost struct{
	WorkspaceName string    `json:"workspace_name"`
}


type ChannelResForPost struct{
	ChannelId string	 `json:"channel_id"`
	ChannelName string `json:"channel_name"`
	WorkspaceId string	`json:"workspace_id"`
	RegisteredAt time.Time	`json:"registered_at"`
}


type WorkspaceResForPost struct{
	WorkspaceId string	 `json:"workspace_id"`
	WorkspaceName string `json:"workspace_name"`
	RegisteredAt time.Time	`json:"registered_at"`
}



