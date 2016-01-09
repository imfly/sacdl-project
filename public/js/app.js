(function() {
    var url = "https://api.github.com/search/repositories?q=bitcoin&sort=stars&order=desc";

    /**
     * start treemap
     */
    Bar.settings = {
        title: "Top100 BarChart",
        desc: "This is a good example.",
        barId: "#barId"
    }
    Bar.init();

    /**
     * start treemap
     */
    Treemap.settings = {
        title: "Top100 treemap",
        desc: "You can click the block to zoom it.",
        treemapId: "#sacdlTreemap"
    }
    Treemap.init();

    d3.json(url, function(data) {        
        Treemap.show(data);
        Bar.show(data);        
    });
})()
