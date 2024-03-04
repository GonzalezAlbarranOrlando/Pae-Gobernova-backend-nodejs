exports.success = function (req, res, message, status) {
    const statusTemp = status || 200;
    const messageTemp = message || '';
    res.status(statusTemp).send({
        error: false,
        status: statusTemp,
        body: messageTemp
    })
}


exports.error = function (req, res, message, status) {
    const statusTemp = status || 500;
    const messageTemp = JSON.stringify(message) || 'Internal Error';
    res.status(statusTemp).send({
        error: true,
        status: statusTemp,
        body: messageTemp
    })
}