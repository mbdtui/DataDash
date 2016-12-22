# DataDash
## Liberty Mutual Capstone

## Test Accounts
ID: admin 
PASSWORD: admin

ID: developer
PASSWORD: developer

ID: manager
PASSWORD: manager

## Build/Run (without Makefile):
(Alternatively, use the Makefile: `make`)

1. Start Mongodb:
  * On Windows, use (make sure the version number is correct):  
    `C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe`
  * On Mac/Linux, use the command `mongod`
2. In a separate window, navigate to the the server directory and run:
  * `npm install`
  * `node server.js`
3. In a separate window, navigate to the the client directory and run:
  * `npm install`
  * `npm run watch`
4. In your browser, go to localhost:3000

## Build/Run (with Makefile):
1. Install Mongod and Postgresql from Homebrew.
  * brew install mongod
  * brew install postgresql
2. In main directory, run Makefile
  * make
3. In your browser, go to localhost:3000
4. To shutdown the server and database
  * make kill
  * (This closes the server by calling "pkill node", if there exists other process that has name "node" in it, it will the processes,too!)

## Hook up Liberty Mock PostgreSQL database

1. Download and install PostgreSQL at http://www.enterprisedb.com/products-services-training/pgdownload, which comes along with pgAdmin allowing us to view the database graphically. On configuring the database in the installation, set the password to 'abc12345' and the port to '5432'. Otherwise, we have to change the configuration object in code files, which will cause merge conflicts because of different settings from each of us.
2. After having the PostgreSQL database installed and ready, we need to load the data logs given by Liberty Mutual into PostgreSQL database. 
  * `node server/data_accessors/populatelibDB.js`
3. Having the data logs populated into the mock database, we now can use libAccessor to query data from the mock database. 

## Configuration
The configuration files are located in the `config` folder. The library for configuration, `node-config`, provides several advance options for deployment, which Liberty Mutual can customize for their deployment. Details about configuration file setup and options can be found [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files) and general information about `node-config` [here](https://github.com/lorenwest/node-config).

There are several configuration parameters for PostgreSQL and Mongo that are hard coded that should be moved into the config file.

### Authentication
Parameters for authentication are located under the `AD` JSON object. If you are familiar with ActiveDirectory and LDAP then configuration should be relatively straightforward. The `default.json` file is also commented to aid understanding.
One best practice is to create a "managed service account" with no password expiration and limited domain access for performing LDAP queries.

There is a dummy-auth.js file that provides simple functionality for testing. Changing the import in server/server.js to auth.js instead of dummy-auth will use real authentication against ActiveDirectory.
