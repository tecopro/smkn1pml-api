let controller = require('./controller/index')

module.exports = (app) => {
    // index
    app.route('/')
        .get(controller.index)
        .post(controller.index)
        .put(controller.index)
        .patch(controller.index)
        .delete(controller.index)

    // school detail
    app.route('/school')
        .get(controller.school)

    // wish api
    app.route('/wish')
        .get(controller.wish.get)
        .post(controller.wish.post)
    app.route('/wish/:id')
        .put(controller.wish.put)
    app.route('/wish/:id')
        .delete(controller.wish.remove)

    // 404
    app.route('*')
        .get(controller.nfound)
        .post(controller.nfound)
        .put(controller.nfound)
        .patch(controller.nfound)
        .delete(controller.nfound)
}