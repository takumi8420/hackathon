package usecase

//import (
//	"slack-like-app/model"
//	"testing"
//)
//
//func TestCreateUser(t *testing.T) {
//	tests := []struct {
//		name        string
//		input       model.UserReqForHTTPPost
//		expectError bool
//	}{
//		{
//			name: "valid input",
//			input: model.UserReqForHTTPPost{
//				Name: "John Doe",
//				Age:  30,
//			},
//			expectError: false,
//		},
//		{
//			name: "name too long",
//			input: model.UserReqForHTTPPost{
//				Name: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz",
//				Age:  30,
//			},
//			expectError: true,
//		},
//		{
//			name: "age too low",
//			input: model.UserReqForHTTPPost{
//				Name: "John Doe",
//				Age:  10,
//			},
//			expectError: true,
//		},
//		{
//			name: "age too high",
//			input: model.UserReqForHTTPPost{
//				Name: "John Doe",
//				Age:  100,
//			},
//			expectError: true,
//		},
//	}
//
//	for _, test := range tests {
//		t.Run(test.name, func(t *testing.T) {
//			_, err := CreateUser(test.input)
//			if test.expectError && err == nil {
//				t.Errorf("expected error but got nil")
//			} else if !test.expectError && err != nil {
//				t.Errorf("unexpected error: %v", err)
//			}
//		})
//	}
//}
