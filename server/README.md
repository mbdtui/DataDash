# DataDash Server

1. Run `npm install`
2. Run `npm app.js`
  * Alternatively you can replace app.js with another file

**If you want to use mongodb, run runMongo.sh
**If you run "runMongo.sh", make sure kill the daemon!!!

## Configuration
The configuration files are located in the `config` folder. The library for configuration, `node-config`, provides several advance options for deployment, which Liberty Mutual can customize for their deployment. Details about configuration file setup and options can be found [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files) and general information about `node-config` [here](https://github.com/lorenwest/node-config).

### Authentication
Parameters for authentication are located under the `AD` JSON object. If you are familiar with ActiveDirectory and LDAP then configuration should be relatively straightforward. The `default.json` file is also commented to aid understanding.
One best practice is to create a "managed service account" with no password expiration and limited domain access for performing LDAP queries.

