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

var createJournalEntry = function(_macroID, _macroName, _macroGroup, _author, _reviewer, _params, _emergency){
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

var readJournalEntries = function(callback){
  JournalEntry.find(function(err, items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

var readJournalEntry = function(query, callback){
  JournalEntry.find(query, function(err,items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

var deleteJournalEntry = function(query){
  JournalEntry.remove(query, function(err){
    if(err){
      console.err("delete failed");
      System.exit(-1);
    }

  });
}

var createPendingMacro = function(_macroID, _macroName, _macroGroup, _author, _params, _emergency){
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

var readPendingMacros = function(callback){
  PendingMacro.find(function(err, items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

var test = function (callback){
  callback(20);
}

var readPendingMacro = function(query, callback){
  PendingMacro.find(query, function(err,items){
    if(err){
      console.err("read failed");
      System.exit(-1);
    }
    callback(items);
  });
}

var deletePendingMacro = function(query){
  PendingMacro.remove(query, function(err){
    if(err){
      console.err("delete failed");
      System.exit(-1);
    }
  });
}

var loadDummyData = function(_dummyJournal, _dummyPending) {
  _dummyJournal.forEach(function(o) {
    createJournalEntry(o.macroID, o.macroName, o.macroGroup, o.author, o.reviewer, {}, o.emergency);
  });
  _dummyPending.forEach(function(o) {
    createPendingMacro(o.macroID, o.macroName, o.macroGroup, o.author, {}, o.emergency);
  });
}

module.exports = {
  createJournalEntry: createJournalEntry,
  readJournalEntries: readJournalEntries,
  readJournalEntry: readJournalEntry,
  deleteJournalEntry: deleteJournalEntry,
  createPendingMacro: createPendingMacro,
  readPendingMacros: readPendingMacros,
  readPendingMacro: readPendingMacro,
  deletePendingMacro: deletePendingMacro,
  test: test,
  loadDummyData: loadDummyData
}
