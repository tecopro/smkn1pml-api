const axios = require('axios').default
const FormData = require('form-data')
const macros = 'https://script.google.com/macros/s/{{gscript_code}}/exec'

const retrieve = (code) => {
    return new Promise((resolve, reject) => {
        let targetUrl = macros.replace('{{gscript_code}}', code)

        axios.get(targetUrl)
            .then((result) => {
                resolve(result.data)
            })
            .catch(reject)
    })
}

const add = (code, data) => {
    return new Promise((resolve, reject) => {
        let targetUrl = macros.replace('{{gscript_code}}', code)

        let form = new FormData()
        for (d in data) {
            let item = data[d]
            form.append(d, item)
        }

        axios.post(targetUrl, form, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`
            }
        }).then((result) => {
            resolve(result.data)
        }).catch(reject)
    })
}

const change = (code, id, data) => {
    return new Promise((resolve, reject) => {
        let targetUrl = macros.replace('{{gscript_code}}', code)

        let form = new FormData()
        for (d in data) {
            let item = data[d]
            form.append(d, item)
        }
        // change action
        form.append('action', 'change')
        form.append('id', id)

        axios.post(targetUrl, form, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`
            }
        }).then((result) => {
            resolve(result.data)
        }).catch(reject)
    })
}

const remove = (code, id) => {
    return new Promise((resolve, reject) => {
        let targetUrl = macros.replace('{{gscript_code}}', code)

        let form = new FormData()
        form.append('action', 'remove')
        form.append('id', id)

        axios.post(targetUrl, form, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`
            }
        }).then((result) => {
            resolve(result.data)
        }).catch(reject)
    })
}

module.exports = {
    retrieve,
    add,
    change,
    remove
}