var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/datadash');

// Import models
var JournalEntry = require('./models/JournalEntry');
var PendingMacro = require('./models/PendingMacro');
var mongo = require('./mongoAccessor.js');
mongo.createJournalEntry("14", "name", "group", "hello", "review", [], false);
mongo.readJournalEntries(function(items){
  console.log(items);
  mongo.deleteJournalEntry({ macroID : "14" });
  mongo.readJournalEntries(function(items){
    console.log(items);
  });
});
