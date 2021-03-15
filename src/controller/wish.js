const { approve, disapprove } = require('../response')
const spreadsheet = require('./../middleware/spreadsheet')

let gscript = process.env.GSCRIPT_WISH
let security = process.env.SECURITY_KEY

const retrieve = async (request, response) => {
    let wish = await spreadsheet.retrieve(gscript)
    let output = wish.data
        .filter(keinginan => keinginan.status == 1)
        .sort((a, b) => Number(a.id) - Number(b.id))

    approve(output, response)
}

const add = async (request, response) => {
    let { name, email, message } = request.body

    if (/^[A-Za-z ]+$/.test(name) !== true) {
        let output = {
            information: `Nama yang Anda masukkan tidak valid`
        }
        return disapprove(output, response)
    } else if (/\S+@\S+\.\S+/.test(email) !== true) {
        let output = {
            information: `Email yang Anda masukkan tidak valid`
        }
        return disapprove(output, response)
    }

    let data = {
        name,
        email,
        wish: message,
        status: 0
    }
    let wish = await spreadsheet.add(gscript, data)
    approve(wish.data, response)
}

const edit = async (request, response) => {
    let { key } = request.query
    let { id } = request.params
    let { name, email, message, status } = request.body

    if (key !== security) {
        let output = {
            information: `Akses Anda ditolak :)`
        }
        return disapprove(output, response)
    } else if (/^[A-Za-z ]+$/.test(name) !== true) {
        let output = {
            information: `Nama yang Anda masukkan tidak valid`
        }
        return disapprove(output, response)
    } else if (/\S+@\S+\.\S+/.test(email) !== true) {
        let output = {
            information: `Email yang Anda masukkan tidak valid`
        }
        return disapprove(output, response)
    } else if (status != 0 && status != 1) {
        let output = {
            information: `Status tidak valid`
        }
        return disapprove(output, response)
    }

    let data = {
        name,
        email,
        wish: message,
        status
    }
    let result = await spreadsheet.change(gscript, id, data)

    if (Object.keys(result.data).length > 0) {
        approve(result.data, response)
    } else {
        let output = {
            information: `Data dengan id '${id}' tidak dapat ditemukan`
        }
        disapprove(output, response)
    }
}

const remove = async (request, response) => {
    let { key } = request.query
    let { id } = request.params

    if (key !== security) {
        return disapprove({
            information: `Akses ini ditolak :)`
        }, response)
    }

    let result = await spreadsheet.remove(gscript, id)

    if (Object.keys(result.data).length > 0) {
        approve(result.data, response)
    } else {
        let output = {
            information: `Data dengan id '${id}' tidak dapat ditemukan`
        }
        disapprove(output, response)
    }
}

const all = async (request, response) => {
    let { key } = request.query
    if (key !== security) {
        let output = {
            information: `Akses Anda ditolak :)`
        }
        return disapprove(output, response)
    }

    let wish = await spreadsheet.retrieve(gscript)
    let output = wish.data
        .sort((a, b) => Number(a.id) - Number(b.id))

    approve(output, response)
}

module.exports = {
    retrieve,
    add,
    edit,
    remove,
    all
}