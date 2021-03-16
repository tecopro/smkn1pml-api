const { nameValidation, emailValidation, urlValidation } = require('./../helper')
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

    if (nameValidation(name) === false) {
        let output = {
            information: `Masukkan nama yang valid`
        }

        return disapprove(output, response)
    } else if (emailValidation(email) === false) {
        let output = {
            information: `Masukkan email yang valid`
        }

        return disapprove(output, response)
    } else if (message === undefined || message.trim() === '') {
        let output = {
            information: `Permintaan tidak boleh kosong`
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
    } else if (id === undefined || id.trim() === '') {
        let output = {
            information: `Parameter id tidak boleh kosong`
        }

        return disapprove(output, response)
    } else if (nameValidation(name) === false) {
        let output = {
            information: `Masukkan nama yang valid`
        }

        return disapprove(output, response)
    } else if (emailValidation(email) === false) {
        let output = {
            information: `Masukkan email yang valid`
        }

        return disapprove(output, response)
    } else if (message === undefined || message.trim() === '') {
        let output = {
            information: `Permintaan tidak boleh kosong`
        }

        return disapprove(output, response)
    } else if (Number(status) !== 0 && Number(status) !== 1) {
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
        let output = {
            information: `Akses ini ditolak :)`
        }

        return disapprove(output, response)
    } else if (id === undefined || id.trim() === '') {
        let output = {
            information: `Parameter id tidak boleh kosong`
        }

        return disapprove(output, response)
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