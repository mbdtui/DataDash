/**
 * Stores authentication credentials.
 */

var token = null;
var user = null;
var group = null;

/**
 * Get the token of the currently authenticated user.
 */
export function getToken() {
  if (isUserLoggedIn()) {
    return token;
  }
  return null;
}

export function getUsername() {
  if (isUserLoggedIn()) {
    return user;
  }
  return null;
}

export function getGroup() {
  if (isUserLoggedIn()) {
    return group;
  }
  return null;
}

/**
 * Update the token and user document of the currently authenticated user.
 */
export function updateCredentials(newUser, newGroup, newToken) {
  token = newToken;
  group = newGroup;
  user = newUser;
}

/**
 * Returns true if the user is logged in.
 * You will implement this during the workshop.
 */
export function isUserLoggedIn() {
  return user !== null;
}

/**
 * Logs the user out.
 * You will implement this during the workshop.
 */
export function logout() {
  token = null;
  group = null;
  user = null;
}
