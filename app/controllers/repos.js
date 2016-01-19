var GitHubApi = require("github");

//from https://www.npmjs.com/package/github
var github = new GitHubApi({
    // required 
    version: "3.0.0",
    // optional 
    debug: false,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "", // for some GHEs; none for GitHub 
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent 
    }
});

var Repos = {
    index: function(req, res) {
        res.render('index');
    },

    search: function(req, res) {
        var msg = {
            q: 'bitcoin',
            sort: 'forks',
            order: 'desc',
            per_page: 100
        }

        github.search.repos(msg, function(err, data) {
            res.json(data);
        })
    }
}

module.exports = Repos;
