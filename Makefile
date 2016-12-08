.PHONY: test client server
all: libDB appDB client server

client: client_dependency
	node ./client/app/app.js
server: server_dependency
	node ./server/server.js
test:
	bash ./test/testDriver.sh
appDB:
	mkdir -p server/data
	mongod --dbpath=./server/data &
kill:
	pgrep mongod | xargs kill -2
	pg_ctl -D server/data2 stop -s -m fast

libDB:
	mkdir -p server/data2
	initdb -D server/data2
	pg_ctl -D server/data2 -l server/DB.log start	

client_dependency:
	npm --prefix ./client install ./client
server_dependency:
	npm --prefix ./server install ./server

