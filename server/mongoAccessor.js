var mongoose = require('mongoose');
var assert = require('assert');

const url = 'mongodb://localhost:27017/datadash';

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("connected");
});

var JournalEntry = require('./models/JournalEntry.js');
var PendingMacro = require('./models/PendingMacro.js');

exports.createJournalEntry = function(_macroID, _macroName, _macroGroup, _author, _reviewer, _params, _emergency){
  var journalEntry = new JournalEntry({
    macroID : _macroID,
    macroName : _macroName,
    macroGroup: _macroGroup,
    author : _author,
    reviewer : _reviewer,
    params : _params,
    emergency : _emergency
  });

  journalEntry.save(function(err, item){
    if(err){
      console.err("save failed");
      System.exit(-1);
    }
  });
}

exports.readJournalEntries = function(callback){
  JournalEntry.find(function(err, items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

exports.readJournalEntry = function(query, callback){
  JournalEntry.find(query, function(err,items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

exports.deleteJournalEntry = function(query){
  JournalEntry.remove(query, function(err){
    if(err){
      console.err("delete failed");
      System.exit(-1);
    }

  });
}

exports.createPendingMacro = function(_macroID, _macroName, _macroGroup, _author, _params, _emergency){
  var pendingMacro = new PendingMacro({
    macroID : _macroID,
    macroName : _macroName,
    macroGroup: _macroGroup,
    author : _author,
    params : _params,
    emergency : _emergency
  });

  pendingMacro.save(function(err, item){
    if(err){
      console.err("save failed");
      System.exit(-1);
    }
  });
}

exports.readPendingMacro = function(callback){
  PendingMacro.find(function(err, items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

exports.readPendingMacro = function(query, callback){
  PendingMacro.find(query, function(err,items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

exports.deletePendingMacro = function(query){
  PendingMacro.remove(query, function(err){
    if(err){
      console.err("delete failed");
      System.exit(-1);
    }
  });
}
