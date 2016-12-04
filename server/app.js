var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/datadash');

// Import models
var JournalEntry = require('./models/JournalEntry');
var PendingMacro = require('./models/PendingMacro');
