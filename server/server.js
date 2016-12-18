var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// Use text parser functionality of bodyParser.
app.use(bodyParser.text());
app.use(bodyParser.json());
// Server all files in the client/build directory.
app.use(express.static('../client/build'));

app.listen(3000, function() {
	console.log('Server is listening on port 3000');
});


