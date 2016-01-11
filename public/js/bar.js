var Bar = (function() {
    var chartWidth = 300,
        barHeight = 20,
        groupHeight = 0,
        gapBetweenGroups = 10,
        spaceForLabels = 150,
        spaceForLegend = 150,
        barId,
        svg,
        data,
        yAxis;

    // Zip the series data together (first values, second values, etc.)
    var zippedData = [];

    return {
        settings: {
            title: "barTitle",
            desc: "barDesc",
            barId: "#barId"
        },

        init: function() {
            barId = this.settings.barId;

            d3.select("#barTitle").text(this.settings.title);
            d3.select("#barDesc").text(this.settings.desc);

            chart = d3.select(barId).append("svg")
                .attr("class", "chart");
        },

        show: function() {
            showBar();
        }
    }

    function zippingData(data) {
        for (var i = 0; i < data.labels.length; i++) {
            for (var j = 0; j < data.series.length; j++) {
                zippedData.push(data.series[j].values[i]);
            }
        }
    }

    function showBar() {
        //Clean
        zippedData = [];

        data = Utils.getBarData();
        groupHeight = barHeight * data.series.length;

        zippingData(data);

        // Color scale
        var color = d3.scale.category20();
        var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

        var x = d3.scale.linear()
            .domain([0, d3.max(zippedData)])
            .range([0, chartWidth]);

        var y = d3.scale.linear()
            .range([chartHeight + gapBetweenGroups, 0]);

        yAxis = d3.svg.axis()
            .scale(y)
            .tickFormat('')
            .tickSize(0)
            .orient("left");

        var svg = chart
            .attr("width", spaceForLabels + chartWidth + spaceForLegend)
            .attr("height", chartHeight);

        // Get the nodes
        var barNodes = svg.selectAll("g").data(zippedData, function (d, i) {
            return [d, i];
        })

        // Create bars
        var bar = barNodes
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.series.length))) + ")";
            });

        // Create rectangles of the correct width
        bar.append("rect")
            .attr("fill", function(d, i) {
                return color(i % data.series.length);
            })
            .attr("class", "bar")
            .attr("width", x)
            .attr("height", barHeight - 1);

        // Add text label in bar
        bar.append("text")
            .attr("x", function(d) {
                return x(d) - 3;
            })
            .attr("y", barHeight / 2)
            .attr("fill", "red")
            .attr("dy", ".35em")
            .text(function(d) {
                return d;
            });

        // Draw labels
        bar.append("text")
            .attr("class", "label")
            .attr("x", function(d) {
                return -10;
            })
            .attr("y", groupHeight / 2)
            .attr("dy", ".35em")
            .text(function(d, i) {
                if (i % data.series.length === 0)
                    return data.labels[Math.floor(i / data.series.length)];
                else
                    return ""
            });

        // Delete the extra nodes
        barNodes.exit()
            .transition()
            .style({
                opacity: 0
            })
            .remove();

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups / 2 + ")")
            .call(yAxis);

        // Draw legend
        var legendRectSize = 18,
            legendSpacing = 4;

        var legendData = svg.selectAll('.legend')
            .data(data.series);

        var legend = legendData
            .enter()
            .append('g')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = -gapBetweenGroups / 2;
                var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', function(d, i) {
                return color(i);
            })
            .style('stroke', function(d, i) {
                return color(i);
            });

        legend.append('text')
            .attr('class', 'legend')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) {
                return d.label;
            });

        legendData.exit().remove();
    }
}())
