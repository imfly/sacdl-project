var express = require('express');
var app = express();
var router = require('./app/router');

app.set('views', './app/views')
app.set('view engine', 'ejs')

app.use(express.static('./public', {
    maxAge: '0', //no cache
    etag: true
}));

router(app);

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Bitcoin-on-nodejs app listening at http://%s:%s', host, port);
});
