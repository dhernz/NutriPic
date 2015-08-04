
var express = require('express');
var multer = require('multer');
var app = express();
var done = false;

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
    res.sendfile('index.html');
});
app.get('/fileupload',function(req,res){
    console.log('Inside of get fileUpload');
    res.sendfile('fileUpload.html');
})

app.post('/api/photo', function (req, res) {
    if (done == true) {
        // console.log(req.files);
        // console.log('We are about to redirect');
        res.redirect('/fileupload');
        res.end();
    }
});

app.listen(8080, function () {
    // console.log("Working on port 8080");
});
