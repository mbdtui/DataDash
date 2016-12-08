const JournalEntry = require("../../../server/api/models/JournalEntry.js");

var assert = require("assert");

var je = new JournalEntry({
  macroID: "28915",
  macroName: "run barry run"
});

assert(je.approved_at != null, "approved_at should not be null");
assert(je.approved_at != null, "approved_at should not be null");
//testing basic property of macro
assert(je != null, "instance of JournalEntry should not be null");
assert(je.macroID == "28915", "macroID of JournalEntry should be equal to 28915");
assert(je.macroName == "run barry run", "macroName of JournalEntry should be equalt to run barry run");
assert(je.macroGroup == null, "We did not define macroGroup; therefore it has to be null");
assert(je.approved_at != null, "approved_at should not be null");
