let AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
    let {username} = event;

    cognito_idp.adminGetUser({
        UserPoolId: process.env.user_pool_id, /* required */
        Username: `${username}` /* required */
    }, function (error, user) {
        if (error) {
            throw error;
        }else{
            console.log(user)
            callback(null, 'Successfully executed');
        }
    });

}