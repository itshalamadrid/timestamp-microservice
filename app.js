const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;;
const querystring = require('querystring');
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());


function isValidUnixTimeStamp(paramDateString)
{
    if (parseInt(paramDateString).toString() == paramDateString) {
        if (parseInt(paramDateString)<=Number.MAX_SAFE_INTEGER && parseInt(paramDateString)>=Number.MIN_SAFE_INTEGER) {
            return true;
        }
    }
    return false;
}

app.get('/api/timestamp/:datestring', (req, res) => {
    var datetimeString = req.params.datestring;
    var months = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
    
    if (Number(datetimeString)) {
        if (isValidUnixTimeStamp(datetimeString)) {
            // Calculate the value in Natural Language Form
            let date = new Date(parseInt(datetimeString)*1000);
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            res.json({
                "unix": parseInt(datetimeString),
                "natural": months[month-1].concat(" " + day + ", " + year)
            });
        }
    } else {
        
        let naturalDateString = querystring.unescape(datetimeString);
        if (isNaN(naturalDateString)) {
            res.json({
                "unix" : null,
                "natural" : null
            })
        } else { 
            res.json({
                "unix": new Date(naturalDateString).getTime()/1000,
                "natural": naturalDateString
            });
        }

    }

})

var serv = app.listen(port, () => {
    console.log('listening');
});

