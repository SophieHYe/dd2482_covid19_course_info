export function extractSearchResults(data, searchString) {
    let searchStringArray = [];
    let searchResults = [];
    let keyValue = 0;
    searchString = searchString.toLowerCase();
    searchStringArray = searchString.split(" ");
    let keys = Object.keys(data[0])
    for (let i = 0; i < data.length; i++) {
        let score = 0;
        let keyBool = false;
        for (let j = 1; j < keys.length; j++) {
            let key = "" + data[i][keys[j]];
            for (let k = 0; k < searchStringArray.length; k++) {
                if (searchStringArray[k] !== "") {
                    if (key !== null) {
                        if (key.toLowerCase().includes(searchStringArray[k])) {
                            keyBool = true;
                            score++;
                        }
                    }
                }
            }
        }
        if (keyBool) {
            data[i].searchResultsScore = score;
            searchResults.push(data[i]);
            keyValue++;
        }
    }
    searchResults.sort(
        function (a, b) {
            if (a.searchResultsScore < b.searchResultsScore) {
                return 1;
            }
            if (a.searchResultsScore > b.searchResultsScore) {
                return -1;
            }
            return 0;
        }
    );
    return searchResults;
}