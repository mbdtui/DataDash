/**
 * Stores authentication credentials.
 */

var token = null;
// User document for the currently logged-in user.
var user = null;

/**
 * Get the token of the currently authenticated user.
 */
export function getToken() {
  if (isUserLoggedIn()) {
    return token;
  }
  return null;
}

/**
 * Get the user ID of the currently authenticated user.
 */
export function getUserId() {
  if (isUserLoggedIn()) {
    return user._id;
  }
  return null;
}

/**
 * Get the full name of the currently authenticated user.
 */
export function getUserFullName() {
  if (isUserLoggedIn()) {
    return user.fullName;
  }
  return null;
}

/**
 * Update the token and user document of the currently authenticated user.
 */
export function updateCredentials(newUser, newToken) {
  token = newToken;
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
  user = null;
}
