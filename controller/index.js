const response = require('../res'),
    wish = require('./wish'),
    fs = require('fs')

// default
const index = async (req, res) => {
    let data = {
        information: `Halo! API ini digunakan oleh website SMK Negeri 1 Pemalang. Lebih lengkapnya kunjungi https://smkn1pml.sch.id/`,
        developers: [
            {
                name: 'Technology Community',
                website: 'https://teco.smkn1pml.sch.id/',
                github: 'https://github.com/tecopro'
            },
            {
                name: 'Suluh Sulistiawan',
                website: 'https://suluh.my.id/',
                github: 'https://github.com/sProDev'
            }
        ]
    }

    response.approve(data, res)
}

// school detail
const school = async (req, res) => {
    let school = __dirname + '/../data/school.json',
        detail = JSON.parse(fs.readFileSync(school, 'utf8'))
    response.approve(detail, res)
}

// page not found
const nfound = async (req, res) => {
    let data = {
        information: `Endpoint ini tidak tersedia`
    }

    response.disapprove(data, res)
}

module.exports = {
    index,
    school,
    nfound,
    wish
}