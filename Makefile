.PHONY: test client server
all: libDB appDB client server

client: client_dependency
	node ./client/app/app.js
server: server_dependency
	node ./server/server.js
test: 
	bash ./test/testDriver.sh
appDB: 
	mongod --dbpath=./server/data &
kill:
	pgrep mongod | xargs kill -2
	pg_ctl -D server/data2 stop -s -m fast

libDB:
	pg_ctl -D server/data2 -l server/DB.log start	

createDB:
	mkdir -p server/data server/data2
	initdb -D server/data2

client_dependency: client/package.json

client/package.json:
	npm --prefix ./client install ./client

server_dependency: server/package.json

server/package.json:
	npm --prefix ./server install ./server

