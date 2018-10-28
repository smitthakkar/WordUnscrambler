

var fileMap = new Map();

function setWordList(value) {
    var list = document.getElementsByName('outputList');
    clearContent(list[0]);
    updateValueFromMap(list[0], value);
}

function clearContent(domElement) {
    while (domElement.firstChild != null || domElement.firstChild != undefined) {
        domElement.removeChild(domElement.firstChild);
    }
}

function updateValueFromMap(list, value) {
    var mapValues = getWordsFromMap(value);
    for (var val of mapValues) {
        list.appendChild(createNodeWithValue(val));
    }
}

function getWordsFromMap(word) {
    var token = getStringDesc(word);
    var allFileKeys = fileMap.keys();
    var resultSet = new Array();
    for (var fileValue of allFileKeys) {
        if (isProperSubset(fileValue, token)) {
            resultSet.push(fileMap.get(fileValue));
        }
    }
    return resultSet;
}

function isProperSubset(source, target) {
    var result = false;
    if (source.length > target.length) {
        result = false;
    }
    else {
        len1 = source.length; len2 = target.length; s1 = 0; t1 = 0; temp = 0;
        while (s1 < len1 && t1 < len2 && source[s1] >= target[t1]) {
            if (source[s1] == target[t1] && source[s1 + 1] <= target[t1 + 1]) {
                s1 += 2; temp++;
            }
            t1 += 2;
        }
        if (temp == len1 / 2) {
            result = true;
        }
    }
    return result;

}


function createNodeWithValue(value) {
    var node = document.createElement("li");
    var textNode = document.createTextNode(value);
    node.appendChild(textNode);
    return node;
}

function populateWordsInMap() {

    for (let value of wordList) {
        var token = getStringDesc(value);
        if (!fileMap.has(token)) {
            fileMap.set(token, new Array());
        }
        fileMap.get(token).push(value);
    }

}

function getStringDesc(value) {
    var tempMap = new Map();
    var tempSet = new Set();
    var tempArray = new Array();
    for (var s of value) {
        if (tempMap.has(s)) {
            tempMap.set(s, tempMap.get(s) + 1);
        }
        else {
            tempMap.set(s, 1);
        }
        tempSet.add(s);
    }
    var responseString = "";

    tempSet.forEach((value) => {
        tempArray.push(value);
    });

    tempArray.sort();

    for (var element of tempArray) {
        responseString += element + tempMap.get(element);
    }

    return responseString;
}