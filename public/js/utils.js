var Utils = (function() {
    var dataSet,
        items = [];

    return {

        init: function(data) {
            dataSet = data;
        },

        /**
         Data format:
        {
            labels: [
                'c/c++', 'python', 'javascript',
                'java', 'ruby', 'html'
            ],
            series: [{
                label: 'Projects count',
                values: [4, 8, 15, 16, 23, 42] //counts
            }]
        }
        */
        getBarData: function() {
            var treeData = this.getTreeData(); //or dataSet
            var items = treeData.children;
            var result = {
                    labels: [],
                    series: []
                },
                values = [];

            items.forEach(function(item) {
                result.labels.push(item.name);
                values.push(item.children.length);
            })

            result.series.push({
                label: 'Projects count',
                values: values
            })

            return result;
        },

        /** Data format:
            {
                    "name": "languages",
                    "children": [{
                        "name": "javascript",
                        "children": [{
                            "name": "imfly/myIDE",
                            "watchers_count": 100,
                            "forks_count": 50 "size": 20
                        }]
                    }]
            }
           */

        getTreeData: function() {
            var languages = {};

            mergeTo(dataSet, {
                "name": "languages",
                "children": []
            });

            if (dataSet && dataSet.items) {
                items = dataSet.items;

                items.forEach(function(item, index) {
                    if (typeof languages[item.language] === "undefined") {
                        languages[item.language] = index;
                    };
                })

                for (var language in languages) {
                    var root = {
                        "name": language,
                        "children": []
                    };

                    items.forEach(function(item, index) {
                        var child = {
                            "name": item.full_name,
                            "watchers_count": item.watchers_count,
                            "forks_count": item.forks_count,
                            "size": 0
                        };

                        if (item.language === language) {
                            root.children.push(child);
                        };
                    })

                    dataSet.children.push(root);
                }
            }

            delete dataSet.items;
            return dataSet;
        }
    }

    //provite methods
    function mergeTo(to, from) {
        for (var key in from) {
            if (typeof to[key] === "undefined") {
                to[key] = from[key]
            }
        }
    }

}())
