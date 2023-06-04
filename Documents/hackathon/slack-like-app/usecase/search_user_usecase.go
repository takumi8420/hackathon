package usecase

import (
	"slack-like-app/dao/user_dao"
	"slack-like-app/model"
)

func GetUserByName(uid string) (*model.UserResForHTTPGet, error) {
	return user_dao.FindUsersByName(uid)
}
