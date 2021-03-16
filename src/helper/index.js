const cleanArray = (actual) => {
    let newArray = new Array();

    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }

    return newArray;
}

const nameValidation = (name) => {
    if (name === undefined || name.trim() === '') {
        return false
    }

    let regex = /^[A-Za-z ]+$/
    return regex.test(name)
}

const emailValidation = (email) => {
    if (email === undefined || email.trim() === '') {
        return false
    }

    let regex = /\S+@\S+\.\S+/
    return regex.test(email)
}

const urlValidation = (url) => {
    if (url === undefined || url.trim() === '') {
        return false
    }

    let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    return regex.test(url)
}

module.exports = {
    cleanArray,
    nameValidation,
    emailValidation,
    urlValidation
}