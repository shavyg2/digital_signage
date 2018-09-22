

exports.handler = function (event, context, callback) {

    let {username,password} = event;
    console.log(event)

    callback(null, 'Successfully executed');
}