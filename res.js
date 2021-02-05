// approve spec
const approve = (values, res) => {
    var data = {
        'success': true,
        'message': "success",
        'data': values
    }

    res.json(data)
    res.end()
}

// disapprove spec
const disapprove = (values, res) => {
    var data = {
        'success': false,
        'message': "failure",
        'data': values
    }

    res.json(data)
    res.end()
}

module.exports = {
    approve,
    disapprove
}