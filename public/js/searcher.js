var Searcher = (function() {
    var url = '',
        baseApiUrl,
        inputTxt,
        searchBtn,
        listeners = [],
        query = {
            type: 'repositories',
            q: 'bitcoin',
            sort: "stars",
            order: "desc"
        };

    return {
        settings: {
            baseApiUrl: 'https://api.github.com/search/'
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
        var q = inputTxt.property('value') || query['q'];

        // for (var key in query) {
        url = baseApiUrl + query['type'] + '?' + 'q=' + q + '&sort=' + query['sort'] + '&order=' + query['order'];
        // };
        console.log(url);

        return url;
    }
}())
