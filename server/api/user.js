const userSet = new Set();
const authApi = require("./dummy-auth.js");

exports.login = function(username, password, callback){
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

exports.logout = function(username){
    return userSet.delete(username);
}

exports.isLoggedIn =  function(username){
    return userSet.has(username);
}

exports.isAdmin = function (username){
    return authApi.isUserAdmin(username);
}

exports.isDeveloper = function (username){
    return authApi.isUserDeveloper(username);
}

exports.isManager = function (username){
    return authApi.isUserManager(username);
}
