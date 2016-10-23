
/* Prequisites:
 * Windows server with the Domain Services role installed and configured as a domain controller. No need for LDS.
 * npm install activedirectory
 * A user (myUser) that is a member of a group (TestGroup) created in AD
 */

// To run: node ad-auth-test.js

var ActiveDirectory = require('activedirectory');
var config = { url: 'ldap://ad.domain.com',
               baseDN: 'dc=ad, dc=domain,dc=com',
               username: 'datadash@ad.domain.com',
               password: 'test1234#' }
var ad = new ActiveDirectory(config);

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
