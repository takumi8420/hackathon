package model

import (
	"time"
)

type UserResForHTTPGet struct {
	Id   string `json:"user_id"`
	Name string `json:"user_name"`
	Age  int    `json:"age"`
}

type UserReqForHTTPPost struct {
	Name string `json:"name"`
	Age  int64  `json:"age"`
}

type UserAndChannelReqForPost struct {
	ChannelId   string `json:"channel_id"`
	WorkspaceId string `json:"workspace_id"`
}

type UserAndChannelResForPost struct {
	ChannelMemberId string `json:"channel_member_id"`
	ChannelId       string `json:"channel_id"`
	WorkspaceId     string `json:"workspace_id"`
	UserId          string `json:"user_id"`
}

type UserAndWorkplaceReqForPost struct {
	WorkspaceId string `json:"workspace_id"`
	Name        string `json:"workspace_user_name"`
}

type UserAndWorkspaceResForPost struct {
	WorkspaceMemberId string `json:"workspace_member_id"`
	WorkspaceId       string `json:"workspace_id"`
	UserId            string `json:"user_id"`
	WorkspaceUserName string `json:"workspace_user_name"`
}

type UserResForHTTPPost struct {
	Id string `json:"id"`
}

type MessagesResForGet struct {
	UserName  string    `json:"user_name"`
	MessageId string    `json:"message_id"`
	ChannelId string    `json:"channel_id"`
	UserId    string    `json:"user_id"`
	Contents  string    `json:"contents"`
	CreatedAt time.Time `json:"created_at"`
}

type MessagesReqForPost struct {
	// MessageId string    `json:"message_id"`
	ChannelId string `json:"channel_id"`
	UserId    string `json:"user_id"`
	Contents  string `json:"contents"`
	// CreatedAt time.Time `json:"created_at"`
	UserName string `json:"user_name"`
}

type MessagesResForPost struct {
	MessageId string    `json:"message_id"`
	ChannelId string    `json:"channel_id"`
	UserId    string    `json:"user_id"`
	Contents  string    `json:"contents"`
	CreatedAt time.Time `json:"created_at"`
	UserName  string    `json:"user_name"`
}

type ChannelReqForPost struct {
	ChannelName string `json:"channel_name"`
	WorkspaceId string `json:"workspace_id"`
}

type WorkspaceReqForPost struct {
	WorkspaceName string `json:"workspace_name"`
}

type ChannelResForPost struct {
	ChannelId    string    `json:"channel_id"`
	ChannelName  string    `json:"channel_name"`
	WorkspaceId  string    `json:"workspace_id"`
	RegisteredAt time.Time `json:"registered_at"`
}

type WorkspaceResForPost struct {
	WorkspaceId   string    `json:"workspace_id"`
	WorkspaceName string    `json:"workspace_name"`
	RegisteredAt  time.Time `json:"registered_at"`
}

type WorkspaceReqForGetByUserId struct {
	UserId string `json:"user_id"`
}

type WorkspaceResForGetByUserId struct {
	WorkspaceUserName string `json:"workspace_user_name"`
	WorkspaceId       string `json:"workspace_id"`
	WorkspaceName     string `json:"workspace_name"`
}

type ChannelReqForGetByWorkspaceId struct {
	WorkspaceId   string `json:"workspace_id"`
	WorkspaceName string `json:"workspace_name"`
}

type ChannelResForGetByWorkspaceId struct {
	//WorkspaceId   string `json:"workspace_id"`
	//WorkspaceName string `json:"workspace_name"`
	ChannelName string `json:"channel_name"`
	ChannelId   string `json:"channel_id"`
	//UserName      string `json:"user_name"`
}
