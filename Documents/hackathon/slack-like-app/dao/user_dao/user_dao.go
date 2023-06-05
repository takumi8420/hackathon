package user_dao

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/oklog/ulid/v2"
	"log"
	"math/rand"
	"os"
	"slack-like-app/model"
	"time"
)

var db *sql.DB

func init() {
	// ①-1 環境変数を用いる

	mysqlUser := os.Getenv("MYSQL_USER")
	mysqlPwd := os.Getenv("MYSQL_PWD")
	mysqlHost := os.Getenv("MYSQL_HOST")
	mysqlDatabase := os.Getenv("MYSQL_DATABASE")

	connStr := fmt.Sprintf("%s:%s@%s/%s", mysqlUser, mysqlPwd, mysqlHost, mysqlDatabase)
	_db, err := sql.Open("mysql", connStr)

	// ①-2
	//_db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@(localhost:3306)/%s", mysqlUser, mysqlPwd, mysqlDatabase))
	if err != nil {
		log.Fatalf("fail: sql.Open, %v\n", err)
	}
	// ①-3
	if err := _db.Ping(); err != nil {
		log.Fatalf("fail: _db.Ping, %v\n", err)
	}
	db = _db
}

func FindUsersByName(uid string) (*model.UserResForHTTPGet, error) {

	rows, err := db.Query("SELECT user_account.user_id, user.user_name, user.age FROM user_account LEFT JOIN user ON user_account.user_id = user.user_id WHERE user_account.firebase_id = ?", uid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	log.Print("rows:", rows)

	var u model.UserResForHTTPGet
	if rows.Next() {
		if err := rows.Scan(&u.Id, &u.Name, &u.Age); err != nil {
			return nil, err
		}
	}

	log.Print("u:", &u)
	return &u, nil
}

func CreateUser(user model.UserReqForHTTPPost, uid string) (model.UserResForHTTPPost, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	log.Println("uid:", uid)
	log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.UserResForHTTPPost{}, err
	}
	defer tx.Rollback()

	_, err = tx.Exec("INSERT INTO user (user_id, user_name, age, registered_at) VALUES (?, ?, ?, ?)", id, user.Name, user.Age, t)
	if err != nil {
		return model.UserResForHTTPPost{}, err
	}
	log.Println("ok user table")

	t1 := time.Now()
	entropy1 := ulid.Monotonic(rand.New(rand.NewSource(t1.UnixNano())), 0)
	id1 := ulid.MustNew(ulid.Timestamp(t), entropy1).String()

	log.Println("id1,id,uid", id1, id, uid)

	_, err = tx.Exec("INSERT INTO user_account (user_id_uid, user_id, firebase_id) VALUES (?, ?, ?)", id1, id, uid)
	if err != nil {
		return model.UserResForHTTPPost{}, err
	}
	log.Println("ok user_account table")

	if err := tx.Commit(); err != nil {
		return model.UserResForHTTPPost{}, err
	}

	return model.UserResForHTTPPost{Id: id}, nil
}

func RegisterUserAndChannel(req model.UserAndChannelReqForPost, uid string) (model.UserAndChannelResForPost, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	log.Println("uid:", uid)
	log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.UserAndChannelResForPost{}, err
	}
	defer tx.Rollback()

	_, err = tx.Exec("INSERT INTO channel_members (channel_member_id, channel_id, workspace_id, user_id) VALUES (?, ?, ?, ?)", id, req.ChannelId, req.WorkspaceId, uid)
	if err != nil {
		return model.UserAndChannelResForPost{}, err
	}
	log.Println("ok user table")

	log.Println("ok user_account table")

	if err := tx.Commit(); err != nil {
		return model.UserAndChannelResForPost{}, err
	}

	return model.UserAndChannelResForPost{ChannelMemberId: id, ChannelId: req.ChannelId, WorkspaceId: req.WorkspaceId, UserId: uid}, nil
}

func RegisterUserAndWorkspace(req model.UserAndWorkplaceReqForPost, uid string) (model.UserAndWorkspaceResForPost, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	log.Println("uid:", uid)
	log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.UserAndWorkspaceResForPost{}, err
	}
	defer tx.Rollback()

	_, err = tx.Exec("INSERT INTO workspace_members (workspace_member_id, workspace_id, user_id, workspace_user_name) VALUES (?, ?, ?, ?)", id, req.WorkspaceId, uid, req.Name)
	if err != nil {
		return model.UserAndWorkspaceResForPost{}, err
	}
	log.Println("ok user table")

	log.Println("ok user_account table")

	if err := tx.Commit(); err != nil {
		return model.UserAndWorkspaceResForPost{}, err
	}

	return model.UserAndWorkspaceResForPost{WorkspaceMemberId: id, WorkspaceId: req.WorkspaceId, UserId: uid, WorkspaceUserName: req.Name}, nil
}
