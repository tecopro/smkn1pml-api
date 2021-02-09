const response = require('../res'),
    fs = require('fs'),
    database = __dirname + '/../data/wish.json',
    wish = JSON.parse(fs.readFileSync(database, 'utf8')),
    security = process.env.SECURITY_KEY

// get
const get = async (req, res) => {
    let output = wish.filter(doa => doa.status != 1).sort((a, b) => Number(a.id) - Number(b.id))
    response.approve(output, res)
}

// get all wish
const all = async (req, res) => {
    let key = req.query.key,
        output = wish.sort((a, b) => Number(a.id) - Number(b.id))

    if (key !== security) {
        let output = {
            information: `Akses Anda ditolak :)`
        }
        return response.disapprove(output, res)
    }

    response.approve(output, res)
}

// post
const post = async (req, res) => {
    let name = req.body.name,
        email = req.body.email,
        message = req.body.message

    if (/^[A-Za-z ]+$/.test(name) !== true) {
        return response.disapprove({
            information: `Nama yang Anda masukkan tidak valid`
        }, res)
    } else if (/\S+@\S+\.\S+/.test(email) !== true) {
        return response.disapprove({
            information: `Email yang Anda masukkan tidak valid`
        }, res)
    }

    let max_id = wish.length === 0 ? 0 : Math.max(...wish.map(wish => +wish.id)),
        data = {
            id: (max_id + 1),
            name: name,
            email: email,
            message: message,
            status: 0
        }

    wish.push(data)
    fs.writeFileSync(database, JSON.stringify(wish))

    let output = wish.sort((a, b) => Number(a.id) - Number(b.id))
    response.approve(output, res)
}

// put
const put = async (req, res) => {
    let key = req.query.key,
        id = req.params.id,
        name = req.body.name,
        email = req.body.email,
        message = req.body.message,
        status = req.body.status

    if (key !== security) {
        let output = {
            information: `Akses Anda ditolak :)`
        }
        return response.disapprove(output, res)
    } else if (/^[A-Za-z ]+$/.test(name) !== true) {
        return response.disapprove({
            information: `Nama yang Anda masukkan tidak valid`
        }, res)
    } else if (/\S+@\S+\.\S+/.test(email) !== true) {
        return response.disapprove({
            information: `Email yang Anda masukkan tidak valid`
        }, res)
    } else if (status != 0 || status != 1) {
        return response.disapprove({
            information: `Status tidak valid`
        }, res)
    }

    let result = wish.filter(doa => doa.id != id)
    if (wish.length > result.length) {

        let data = {
            id: id,
            name: name,
            email: email,
            message: message
        }
        result.push(data)
        fs.writeFileSync(database, JSON.stringify(result))

        let output = result.sort((a, b) => Number(a.id) - Number(b.id))
        response.approve(output, res)

    } else {

        response.disapprove({
            information: `Data dengan id '${req.params.id}' tidak dapat ditemukan`
        }, res)

    }
}

// delete
const remove = async (req, res) => {
    let key = req.query.key,
        id = req.params.id

    if (key !== security) {
        return response.disapprove({
            information: `Akses ini ditolak :)`
        }, res)
    }

    let result = wish.filter(doa => doa.id != id)
    // for (let i = doa.length - 1 i >= 0 i--) {
    //     if (doa[i].id == id) {
    //         doa.splice(i, 1)
    //     }
    // }

    if (wish.length > result.length) {

        fs.writeFileSync(database, JSON.stringify(result))
        let output = result.sort((a, b) => Number(a.id) - Number(b.id))
        response.approve(output, res)

    } else {

        let output = {
            information: `Data dengan id ${id} tidak dapat ditemukan`
        }
        response.disapprove(output, res)

    }
}

module.exports = {
    get,
    all,
    post,
    put,
    remove
}