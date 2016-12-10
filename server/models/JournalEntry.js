var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var journalEntrySchema = new Schema({
  macroID: String,
  macroName: String,
  macroGroup: String,
  author: String,
  reviewer: String,
  params: Object,
  emergency: Boolean,
  created_at: Date,
  approved_at: Date
});

journalEntrySchema.pre('save', function(next) {
  var currentDate = new Date();
  if (!this.created_at) this.created_at = currentDate;
  else this.approved_at = currentDate;
  next();
});

var JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

module.exports = JournalEntry;
