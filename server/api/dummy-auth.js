"use strict"

/**
 * authenticate - Authenticates a users based on the provided credentials
 *
 * @param  {String} username
 * @param  {String} password
 * @throws an Error if there is a problem authenticating the user
 * @return {boolean} True if the user was successfully authenticated. False otherwise.
 */
var authenticate = function(username, password) {
  if (username == 'developer' && password == 'developer') {
    return true;
  }
  else if (username == 'admin' && password == 'admin') {
    return true;
  }
  else if (username == 'manager' && password == 'manager') {
    return true;
  }
  else {
    return false;
  }
}

/**
 * isUserAdmin - looks up if the specified user is a member of the admin group.
 *
 * @param  {type} username
 * @throws an Error if there was an issue looking up the group membership.
 * @return {boolean} True if the user is a member of the admin group. False otherwise.
 */
var isUserAdmin = function(username) {
  return username == 'admin';
}

/**
 * isUserDeveloper - looks up if the specified user is a memeber of the developer group.
 *
 * @param  {type} username
 * @throws an Error if there was an issue looking up the group membership.
 * @return {type} True if the user is a member of the developer group. False otherwise.
 */
var isUserDeveloper = function(username) {
  return username == 'developer';
}

/**
 * isUserManager - Looks up if the specified user is a member of the manager group.
 *
 * @param  {type} username
 * @throws an Error if there was an issue looking up the group membership
 * @return {type} True if the user is a member of the manager group. False otherwise.
 */
var isUserManager = function(username) {
  return username == 'manager';
}

module.exports = {
  authenticate: authenticate,
  isUserAdmin: isUserAdmin,
  isUserDeveloper: isUserDeveloper,
  isUserManager: isUserManager
}
