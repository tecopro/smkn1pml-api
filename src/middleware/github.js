const axios = require('axios').default
const repository = 'https://api.github.com/repos/' + process.env.REPOSITORY + '/contributors?anon=1'
const user = 'https://api.github.com/users/{{username}}?anon=1'

const contributors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let contributors = await axios.get(repository)
            contributors = contributors.data
            let developers = []

            for (c in Object.keys(contributors)) {
                let contributor = contributors[c]

                let profile = await users(contributor.login)
                let { name, blog, html_url } = profile

                let developer = {
                    name,
                    website: blog,
                    github: html_url
                }
                developers.push(developer)
            }

            resolve(developers)
        } catch (err) {
            reject(err)
        }
    })
}

const users = (login) => {
    return new Promise(async (resolve, reject) => {
        let url = user.replace('{{username}}', login)

        axios.get(url)
            .then((result) => {
                resolve(result.data)
            })
            .catch(reject)
    })
}

module.exports = {
    contributors,
    users
}