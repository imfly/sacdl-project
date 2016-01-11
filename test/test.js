var Test = (function() {
    var dataset = [1, 2, 3, 4];

    return {
        init: function() {
            // body...
        },

        show: function(data) {
            data = data || dataset;

            var chart = d3.select('#testId')
                .selectAll('p')
                .data(data, function(d, i) { return [d , i]; });

            chart
                .enter()
                .append('p')
                .text(function(d, i) {
                	console.log(d);
                    return [d, i];
                })

            chart.exit().remove();

            console.log("It`s " + data)
        }
    }
}())
