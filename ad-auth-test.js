
/* Prequisites:
 * Windows server with the Domain Services role installed and configured as a domain controller. No need for LDS.
 * npm install activedirectory
 * A user (myUser) that is a member of a group (TestGroup) created in AD
 */

// To run: node ad-auth-test.js

var config = require('config');
var ActiveDirectory = require('activedirectory');

// Build config for the ActiveDirectory module
// TODO Add error handling that informs the user that there was an error in the config
// TODO config.get() will throw an exception for undefined keys to help catch typos and missing values
// TODO Altively use config.has() on each value.
var ActiveDirectoryModuleConfig = {
  url: config.get('AD.url'),
  baseDN: config.get('AD.baseDN'),
  username: config.get('AD.username'),
  password: config.get('AD.password')
}

var ad = new ActiveDirectory(ActiveDirectoryModuleConfig);

var username = 'myuser@ad.domain.com';
var password = 'myPassword';
var groupName = 'TestGroup';

// Authenticate the user:
ad.authenticate(username, password, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }

  if (auth) {
    console.log('Authenticated!');
  }
  else {
    console.log('Authentication failed!');
  }
});

// Check that the user is authorized by group membership:
// Note that this method doesn't check a user's primary group https://github.com/gheeres/node-activedirectory/issues/74. This isn't functionality we should need, but it's important to be aware of.
ad.isUserMemberOf(username, groupName, function(err, isMember) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }

  console.log(username + ' isMemberOf ' + groupName + ': ' + isMember);
});
