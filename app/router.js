var repos = require('./controllers/repos');

var Router = function(app) {
    app.get('/search', repos.search);
    app.get('/', repos.index);
}

module.exports = Router;