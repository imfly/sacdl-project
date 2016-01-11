var Searcher = (function() {
    var url = '',
        baseApiUrl,
        inputTxt,
        searchBtn,
        listeners = [],
        query = {
            q: 'bitcoin',
            sort: "stars",
            order: "desc",
            per_page: 100
        };

    return {
        settings: {
            baseApiUrl: 'https://api.github.com/search/repositories'
        },

        init: function() {
            inputTxt = d3.select('#search-input');
            searchBtn = d3.select('#search-btn');
            baseApiUrl = this.settings.baseApiUrl;

            searchBtn.on('click', function() {
                parseQuery();
                listeners.forEach(function(listener) {
                    try {
                        listener(url);
                    } catch (error) {
                        console.log(error);
                    }
                })
            })
        },

        addListener: function(listener) {
            listeners.push(listener);
        }
    };

    function parseQuery() {
        query.q = inputTxt.property('value') || 'bitcoin';
        var arr = [];

        for (var key in query) {
            arr.push(key + '=' + query[key]);
        };

        url = baseApiUrl + '?' + arr.join('&');

        console.log(url);

        return url;
    }
}())
