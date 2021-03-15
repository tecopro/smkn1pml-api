const { approve, disapprove } = require('./../response')
const github = require('./../middleware/github')
const schoolDetails = require('../data/sekolah.json')

const home = async (request, response) => {
    try {
        let contributors = await github.contributors()
        let data = {
            information: `Halo! API ini digunakan oleh website SMK Negeri 1 Pemalang. Lebih lengkapnya kunjungi https://smkn1pml.sch.id/`,
            contributors
        }

        approve(data, response)
    } catch (err) {
        disapprove(err, response)
    }
}

const school = async (request, response) => {
    approve(schoolDetails, response)
}

const error = async (request, response) => {
    let data = {
        information: `Endpoint ini tidak tersedia.`
    }

    approve(data, response)
}

module.exports = {
    home,
    school,
    error
}