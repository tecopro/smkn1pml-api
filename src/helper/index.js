const cleanArray = (actual) => {
    var newArray = new Array();

    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }

    return newArray;
}

module.exports = {
    cleanArray
}