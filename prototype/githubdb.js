require('dotenv').config({ path: __dirname + '/../.env' })

const options = {
    host: 'api.github.com',
    pathPrefix: null,
    protocol: 'https',
    owner: process.env.GH_USER,
    repo: process.env.GH_REPO,
    path: 'example.json'
}
let GithubDB = require('github-db').default,
    ghdb = new GithubDB(options)

const start = () => {
    ghdb.auth(process.env.GH_TOKEN)
    ghdb.connectToRepo()

    ghdb.save({ example: 'Test ngab!' })
        .then((res) => {
        })
}

start()