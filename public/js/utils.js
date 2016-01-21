var Utils = (function() {
    var treeData;

    return {
        getData: function(data) {
            treeData = data;
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
}())
