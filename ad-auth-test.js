"use strict"
/* Prequisites:
 * Windows server with the Domain Services role installed and configured as a domain controller. No need for LDS.
 * npm install activedirectory
 */

// To run: node ad-auth-test.js

var config = require('config');
var ActiveDirectory = require('activedirectory');

// Build config for the ActiveDirectory module
// TODO Add error handling that informs the user that there was an error in the config
// TODO config.get() will throw an exception for undefined keys to help catch typos and missing values
// TODO Altively use config.has() on each value.
const DEVELOPER_AD_GROUP = config.get('AD.developer-group');
const ADMIN_AD_GROUP = config.get('AD.admin-group');
const MANAGER_AD_GROUP = config.get('AD.manager-group');

var ActiveDirectoryModuleConfig = {
  url: config.get('AD.url'),
  baseDN: config.get('AD.baseDN'),
  username: config.get('AD.username'),
  password: config.get('AD.password')
}

var ad = new ActiveDirectory(ActiveDirectoryModuleConfig);

let username = 'myUsername';
let password = 'myPassword';

authenticate(username, password);
isUserMemberOf(username, DEVELOPER_AD_GROUP);
isUserMemberOf(username, ADMIN_AD_GROUP);
isUserMemberOf(username, MANAGER_AD_GROUP);
getGroupMembershipForUser(username);

// Authenticate the user:
// TODO give proper return type
function authenticate(username, password) {
  ad.authenticate(username, password, function(err, auth) {
    if (err) {
      console.log('Failed to authenticate \'' + username + '\'');
      console.log('ERROR:' + JSON.stringify(err));
      return;
    }

    if (auth) {
      console.log('Authenticated \'' + username + '\'');
    }
    else {
      console.log('Failed to authenticate \'' + username + '\'');
    }
  });
}

// Check that the user is authorized by group membership:
// Note that this method doesn't check a user's primary group https://github.com/gheeres/node-activedirectory/issues/74. This isn't functionality we should need, but it's important to be aware of.
// TODO give proper return type
function isUserMemberOf(username, group){
  ad.isUserMemberOf(username, group, function(err, isMember) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      return;
    }

    console.log(username + ' isMemberOf ' + group + ': ' + isMember);
  });
}

// TODO give proper return type
function getGroupMembershipForUser(username) {
  ad.getGroupMembershipForUser(username, function(err, groups) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      return;
    }

    if (! groups) {
      console.log('User: ' + username + ' not found.');
    }
    else {
      console.log(JSON.stringify(groups));
    }
  });
}
