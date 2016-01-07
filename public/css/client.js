var Utils = (function() {

    return {
        formatTreeData: function(dataSet) {
            var result = {
                "name": "languages",
                "children": []
            }

            if (dataSet && dataSet.items) {
                var items = dataSet.items,
                    languages = [];

                result.total_count = dataSet.total_count;

                items.forEach(function(item) {
                	if (languages[item.language] < 0) return;

                    var child = {
                        "name": item.language,
                        "children": []
                    };

                    languages.push(item.language);

                    result.children.push(child);
                })

                items.forEach(function(item) {
                    var child = {
                        name: item.full_name,
                        watchers_count: item.watchers_count,
                        forks_count: item.forks_count
                    };

                    if (item) {};
                    result.children.push(child);
                })
            };

        }
    }

    // function formatData(data) {

    // return {
    //     "name": "languages",

    //     "children": [{
    //         "name": "javascript",
    //         "children": [{
    //             "name": "imfly/myIDE",
    //             "size": 3938

}())
