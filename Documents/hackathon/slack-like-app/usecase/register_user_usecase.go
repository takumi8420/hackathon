package usecase

import (
	"errors"
	"slack-like-app/dao/user_dao"
	"slack-like-app/model"
)

func CreateUser(user model.UserReqForHTTPPost, uid string) (model.UserResForHTTPPost, error) {
	if len(user.Name) > 50 {
		return model.UserResForHTTPPost{}, errors.New("fail: length of name")
	}
	if user.Age > 80 || user.Age < 20 {
		return model.UserResForHTTPPost{}, errors.New("fail: range of age")
	}

	return user_dao.CreateUser(user, uid)
}
