var express = require('express');
var app = express();
var GitHubApi = require("github");

//from https://www.npmjs.com/package/github
var github = new GitHubApi({
    // required 
    version: "3.0.0",
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "", // for some GHEs; none for GitHub 
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent 
    }
});

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('./public', {
    maxAge: '0', //no cache
    etag: true
}));

app.get('/', function(req, res) {
    var msg = {
        q: 'bitcoin',
        sort: 'forks',
        order: 'desc',
        per_page: 100
    }

    github.search.repos(msg, function(err, data) {
        console.log(data);
        res.render('index');
    })
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
