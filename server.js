var express = require('express');
var formidable = require('formidable');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if (err) throw err
        console.log('files', files)
    
        res.json({
            name: files.upfile.name, 
            type: files.upfile.type, 
            size: files.upfile.size
        });
    })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
