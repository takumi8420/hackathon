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

type UserPhotoReqForHTTPPost struct {
	Id           string `json:"user_id"`
	UserPhotoURL string `json:"user_photoURL"`
}

type UserPhotoResForHTTPPost struct {
	Id           string `json:"user_id"`
	UserPhotoURL string `json:"user_photoURL"`
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
	UserName     string `json:"user_name"`
	MessageId    string `json:"message_id"`
	ChannelId    string `json:"channel_id"`
	UserId       string `json:"user_id"`
	Contents     string `json:"contents"`
	CreatedAt    string `json:"created_at"`
	IsEdited     int    `json:"is_edited"`
	UserPhotoURL string `json:"photo_url"`
}

type MessagesReqForPost struct {
	// MessageId string    `json:"message_id"`
	ChannelId string `json:"channel_id"`
	UserId    string `json:"user_id"`
	Contents  string `json:"contents"`
	// CreatedAt time.Time `json:"created_at"`
}

type MessagesResForPost struct {
	MessageId string `json:"message_id"`
	ChannelId string `json:"channel_id"`
	UserId    string `json:"user_id"`
	Contents  string `json:"contents"`
	CreatedAt string `json:"created_at"`
	UserName  string `json:"user_name"`
	IsEdited  int    `json:"is_edited"`
}

type ChannelReqForPost struct {
	ChannelName string `json:"channel_name"`
	WorkspaceId string `json:"workspace_id"`
}

type WorkspaceReqForPost struct {
	WorkspaceName string `json:"workspace_name"`
}

type WorkspaceAndUserReqForPost struct {
	WorkspaceId string `json:"workspace_id"`
}

type WorkspaceAndUserResForPost struct {
	WorkspaceId string `json:"workspace_id"`
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

type AllWorkspaceResForGet struct {
	WorkspaceId   string `json:"workspace_id"`
	WorkspaceName string `json:"workspace_name"`
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

type MessagesReqForDelete struct {
	MessageId string `json:"message_id"`
	//Contents  string `json:"contents"`
	//CreatedAt string `json:"created_at"`
	//UserName  string `json:"user_name"`
	//IsEdited  int    `json:"is_edited"`d
}

type MessagesResForDelete struct {
	MessageId string `json:"message_id"`
}

type MessagesReqForEdit struct {
	MessageId string `json:"message_id"`
	Contents  string `json:"contents"`
}

type MessagesResForEdit struct {
	MessageId string `json:"message_id"`
	Contents  string `json:"contents"`
}
