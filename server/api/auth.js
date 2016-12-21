"use strict"

var config = require('config');
var ActiveDirectory = require('activedirectory');

const ADMIN_GROUP      = config.get('AD.ADMIN_GROUP');
const DEVELOPER_GROUP  = config.get('AD.DEVELOPER_GROUP');
const MANAGER_GROUP    = config.get('AD.MANAGER_GROUP');

var ActiveDirectoryModuleConfig = {
  url:      config.get('AD.url'),
  baseDN:   config.get('AD.baseDN'),
  username: config.get('AD.username'),
  password: config.get('AD.password')
}

var ad = new ActiveDirectory(ActiveDirectoryModuleConfig);

/**
 * authenticate - Authenticates a users based on the provided credentials
 *
 * @param  {String} username
 * @param  {String} password
 * @throws an Error if there is a problem authenticating the user
 * @return {boolean} True if the user was successfully authenticated. False otherwise.
 */
var authenticate = function(username, password) {
  ad.authenticate(username, password, function(err, auth) {
    if (err) {
      throw new Error('Failed to authenticate \'' + username + '\' : '
                      + JSON.stringify(err));
    }

    if (auth) {
      console.log('Authenticated \'' + username + '\'');
    }
    else {
      console.log('Failed to authenticate \'' + username + '\'');
    }
    return auth;
  });
}

/**
 * isUserMemberOf - checks whether 'username' is a member of 'group' in AD
 *
 * Note that this method doesn't check a user's primary group https://github.com/gheeres/node-activedirectory/issues/74.
 * This isn't functionality we should need, but it's important to be aware of.
 *
 * @param  {String} username
 * @param  {String} group
 * @throws an Error if there was an issue checking group membership
 * @return {boolean} True if 'username' is a member of 'group'. False otherwise.
 */
function isUserMemberOf(username, group){
  ad.isUserMemberOf(username, group, function(err, isMember) {
    if (err) {
      throw new Error('Error while checking that \'' + username '\' is a member of \''
                      + group + '\' : ' + JSON.stringify(err));
    }

    console.log(username + ' isMemberOf ' + group + ': ' + isMember);
    return isMember;
  });
}

/**
 * getGroupMembershipForUser - Gets the group membership for 'username'
 *
 * @param  {type} username
 * @throws an Error if there was an issue getting the group membership
 * @return {JSON} A JSON object defining group membership for 'username'
 */
function getGroupMembershipForUser(username) {
  ad.getGroupMembershipForUser(username, function(err, groups) {
    if (err) {
      console.log('ERROR: ' + JSON.stringify(err));
      throw new Error('There was an error getting the groups for \'' + username '\'');
    }

    if (! groups) {
      throw new Error('User: ' + username + ' not found.')
    }
    else {
      console.log(JSON.stringify(groups));
    }
    return groups;
  });
}

/**
 * isUserAdmin - looks up if the specified user is a member of the admin group.
 *
 * @param  {type} username
 * @throws an Error if there was an issue looking up the group membership.
 * @return {boolean} True if the user is a member of the admin group. False otherwise.
 */
var isUserAdmin = function(username) {
  return isUserMemberOf(username, ADMIN_GROUP);
}

/**
 * isUserDeveloper - looks up if the specified user is a memeber of the developer group.
 *
 * @param  {type} username
 * @throws an Error if there was an issue looking up the group membership.
 * @return {type} True if the user is a member of the developer group. False otherwise.
 */
var isUserDeveloper = function(username) {
  return isUserMemberOf(username, DEVELOPER_GROUP;
}

/**
 * isUserManager - Looks up if the specified user is a member of the manager group.
 *
 * @param  {type} username
 * @throws an Error if there was an issue looking up the group membership
 * @return {type} True if the user is a member of the manager group. False otherwise.
 */
var isUserManager = function(username) {
  return isUserMemberOf(username, MANAGER_GROUP);
}

var getUserGroup = function(username) {
  if (isUserAdmin(username)){
    return ADMIN_GROUP;
  }
  else if (isUserManager(username)) {
    return MANAGER_GROUP;
  }
  else if (isUserDeveloper(username)) {
    return DEVELOPER_GROUP;
  }
  else {
    return null;
  }
}

module.exports = {
  ADMIN_GROUP : ADMIN_GROUP,
  DEVELOPER_GROUP : DEVELOPER_GROUP,
  MANAGER_GROUP : MANAGER_GROUP,
  authenticate: authenticate,
  isUserAdmin: isUserAdmin,
  isUserDeveloper: isUserDeveloper,
  isUserManager: isUserManager,
  getUserGroup : getUserGroup
}
