var Utils = (function() {
    var dataSet, treeData;

    return {
        getData: function(data) {
            dataSet = data;
            treeData = dataToJson();
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

        /**
                 [
                 { name: "repos" , 
                   languages: [  { language: 'js', count: 3000 },
                             { language: 'ruby', count: 1300 }]
                ];
                 */
        getStackData: function() {
            var items = treeData.children;

            var result = {
                name: "repos",
                languages: []
            }

            //1. 确定初始数据
            items.forEach(function(item) {
                if (item.name === "null") {
                    return
                };
                var child = {
                    language: item.name,
                    count: item.children.length
                };

                result.languages.push(child);
            })

            return [result];
        },
        /** Data format:
            {
                    "name": "languages",
                    "children": [{
                        "name": "javascript",
                        "children": [{
                            "name": "imfly/myIDE",
                            "watchers_count": 100,
                            "forks_count": 50
                        }]
                    }]
            }
           */
        getTreeData: function() {
            return treeData;
        }
    }

   //provite methods
    function dataToJson() {
        var languages = {};

        var result = {
            "name": "languages",
            "children": []
        }

        if (dataSet && dataSet.items) {
            var items = dataSet.items;

            items.forEach(function(item, index) {
                if (typeof languages[item.language] === "undefined") {
                    languages[item.language] = index;
                };
            })

            for (var language in languages) {
                if (language === "null") {
                    language = "others";
                };

                var root = {
                    "name": language,
                    "children": []
                };

                items.forEach(function(item, index) {
                    var child = {
                        "name": item.full_name,
                        "watchers_count": item.watchers_count,
                        "forks_count": item.forks_count
                    };

                    if (item.language === language || (item.language === "null" && language === "others")) {
                        root.children.push(child);
                    };
                })

                result.children.push(root);
            }
        }

        return result;
    }
 
    function mergeTo(to, from) {
        for (var key in from) {
            if (typeof to[key] === "undefined") {
                to[key] = from[key]
            }
        }
    }

}())
