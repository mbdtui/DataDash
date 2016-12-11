const userSet = new Set();
const authApi = require("./auth.js");

function login = function(username, password, callback){
  if(authApi.authenticate(username, password)){
    if(userSet.has(username)) return false;
    else{
      userSet.add(username);
      return true;
    } 
  }
  else{
    return false;
  }
}

function logout(username){
  userSet.delete(username);
}

function isLoggedIn (username){
  return userSet.has(username);
}

function isAdmin(username){
  return authApi.isUserAdmin(username);
}

function isDeveloper(username){
  return authApi.isUserDeveloper(username);
}

function isManager(username){
  return authApi.isUserManager(username);
}
