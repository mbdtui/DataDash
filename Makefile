.PHONY: test client server
all: libDB appDB client server

client: client_dependency
	cd client && npm run watch
server: server_dependency
	cd server && node server.js
test: 
	bash ./test/testDriver.sh
appDB: 
	mongod --dbpath=./server/data &
kill:
	pgrep mongod | xargs kill -2
	pg_ctl -D server/data2 stop -s -m fast

libDB:
	pg_ctl -D server/data2 -l server/DB.log start	
	sleep 5
	/usr/local/Cellar/postgresql/9.5.2/bin/createuser -s postgres 


clean:
	rm -rf server/data server/data2

createDB:
	mkdir -p server/data server/data2
	initdb -D server/data2

populate:
	cd ./server/data_accessors && node populatelibDB.js

client_dependency: client/package.json

client/package.json:
	npm --prefix ./client install ./client

server_dependency: server/package.json

server/package.json:
	npm --prefix ./server install ./server

demo: createDB libDB appDB populate server client
