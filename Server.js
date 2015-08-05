
var express = require('express');
var multer = require('multer');
var app = express();
var path = require('path');
var done = false;

app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return Date.now();
    },
    onFileUploadStart: function (file) {
        // console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        // console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public', 'index.html'))
});
app.get('/fileupload',function(req,res){
    console.log('Inside of get fileUpload');
    res.sendFile(path.join(__dirname, './public', 'fileupload.html'))

})

app.post('/api/photo', function (req, res) {
    if (done == true) {
        // console.log(req.files);
        // console.log('We are about to redirect');
        res.redirect('/fileupload');
        res.end();
    }
});


var port = process.env.PORT || 8080 ;
app.listen(port);
