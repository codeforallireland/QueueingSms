var ModemSmsFetcher = function() {

	var fs = require('fs'),
		readline = require('readline'),
		stream = require('stream');

	var modem = '/dev/ttyUSB0',
		millisBetweenChecks = 500;

	var instream = fs.createReadStream(modem);
	var outstream = new stream;
	
	var newSmsCallbacks = [];
	
	function checkForNewSms() {
		fs.writeFile(modem, 'AT+CMGL="ALL"', 'ascii');
	}
	
	setInterval(checkForNewSms, millisBetweenChecks);
	
	var interface = {};
	
	interface.addNewSmsListener = function(callback) {
		newSmsCallbacks.push(callback);
	};
	
	return interface;
};