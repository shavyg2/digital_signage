

exports.handler = function (event, context, callback) {

    let {username,password} = event;

    callback(null, 'Successfully executed');
}