var http = require('http');
var dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');
const { argv } = require('process');
dayjs.extend(customParseFormat);

function serverCallback (req, res) {
    var beginTime = dayjs("16:00", "HH:mm"); 
    var endTime = dayjs("18:00", "HH:mm");
    var message = "Hello, " + process.argv[2] + "!\n";
    message += "Welcome to our page. \n";
    message += "Now, it's " + dayjs().format("HH:mm") + ".\n";
    message += "Our business hours is from " + beginTime.format("HH:mm") + " to " + endTime.format("HH:mm") + ".\n";

    var beginDifference = beginTime.diff(dayjs(), 'minutes');
    var endDifference = endTime.diff(dayjs(), 'minutes');


    if(beginDifference > 0) message += "Please come back in " + beginDifference + " minutes.";
    if(endDifference < 0) message += "Please come back tomorrow.";

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(message);
}

http.createServer(serverCallback).listen(8080);