var mongo = require('./mongoAccessor.js');
mongo.createJournalEntry("14", "name", "group", "hello", "review", [], false);
mongo.readJournalEntries(function(items){
  console.log(items);
  mongo.deleteJournalEntry({ macroID : "14" });
  mongo.readJournalEntries(function(items){
    console.log(items);
  });
});
