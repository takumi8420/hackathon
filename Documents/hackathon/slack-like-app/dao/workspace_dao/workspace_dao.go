package workspace_dao

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

func RegisterWorkspace(workspace_data model.WorkspaceReqForPost) (model.WorkspaceResForPost, error) {
	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	// log.Println("uid:", uid)
	log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.WorkspaceResForPost{}, err
	}
	defer tx.Rollback()

	_, err = tx.Exec("INSERT INTO workspace (workspace_id, workspace_name, registered_at) VALUES (?, ?, ?)", id, workspace_data.WorkspaceName, t)
	if err != nil {
		return model.WorkspaceResForPost{}, err
	}
	log.Println("ok user table")

	log.Println(id, workspace_data.WorkspaceName, t)

	if err := tx.Commit(); err != nil {
		return model.WorkspaceResForPost{}, err
	}

	return model.WorkspaceResForPost{WorkspaceId: id, WorkspaceName: workspace_data.WorkspaceName, RegisteredAt: t}, nil
}

func WorkspaceAndUserHandler(workspaceData model.WorkspaceAndUserReqForPost, uid string) (model.WorkspaceAndUserResForPost, error) {

	t := time.Now()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy).String()
	// log.Println("uid:", uid)
	log.Println("id:", id)

	tx, err := db.Begin()
	if err != nil {
		return model.WorkspaceAndUserResForPost{}, err
	}
	defer tx.Rollback()

	_, err = tx.Exec("INSERT INTO workspace_members (workspace_member_id, workspace_id, user_id) VALUES (?, ?, ?)", id, workspaceData.WorkspaceId, uid)
	if err != nil {
		return model.WorkspaceAndUserResForPost{}, err
	}
	log.Println("ok user table")

	//log.Println(id, workspace_data.WorkspaceName)

	if err := tx.Commit(); err != nil {
		return model.WorkspaceAndUserResForPost{}, err
	}

	return model.WorkspaceAndUserResForPost{WorkspaceId: id}, nil
}

func FindWorkspaceByUserId(UId string) (*[]model.WorkspaceResForGetByUserId, error) {

	log.Println(UId)

	rows, err := db.Query("SELECT workspace_members.workspace_user_name ,workspace.workspace_id, workspace.workspace_name FROM workspace LEFT JOIN workspace_members ON workspace_members.workspace_id = workspace.workspace_id WHERE workspace_members.user_id = ?", UId)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	log.Println("workspace読み取れてはいます")
	log.Println("rows:", rows)

	workspaces := make([]model.WorkspaceResForGetByUserId, 0)

	for rows.Next() {
		var u model.WorkspaceResForGetByUserId
		if err := rows.Scan(&u.WorkspaceUserName, &u.WorkspaceId, &u.WorkspaceName); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
		}
		workspaces = append(workspaces, u)
		log.Print("u:", workspaces)
	}
	if err := rows.Err(); err != nil {
		log.Printf("fail: rows.Err(), %v\n", err)
		// エラーハンドリングの処理を追加することが望ましいです
	}
	if err := rows.Close(); err != nil {
		log.Printf("fail: rows.Close(), %v\n", err)
		// エラーハンドリングの処理を追加することが望ましいです
	}
	log.Println("channels:", workspaces)
	return &workspaces, nil
}

func FindAllWorkspace() (*[]model.AllWorkspaceResForGet, error) {

	rows, err := db.Query("SELECT workspace_id, workspace_name FROM workspace")
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	log.Print("workspace読み取れてはいます")
	log.Print("rows:", rows)

	workspaces := make([]model.AllWorkspaceResForGet, 0)

	for rows.Next() {
		var u model.AllWorkspaceResForGet
		if err := rows.Scan(&u.WorkspaceId, &u.WorkspaceName); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
		}
		workspaces = append(workspaces, u)
		log.Println("u:", workspaces)
	}
	if err := rows.Err(); err != nil {
		log.Printf("fail: rows.Err(), %v\n", err)
		// エラーハンドリングの処理を追加することが望ましいです
	}
	if err := rows.Close(); err != nil {
		log.Printf("fail: rows.Close(), %v\n", err)
		// エラーハンドリングの処理を追加することが望ましいです
	}
	log.Println("channels:", workspaces)
	return &workspaces, nil
}
