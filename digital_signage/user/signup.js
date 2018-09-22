let AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = async function (event, context, callback) {

    let { username, password,email } = event;

    cognito_idp.adminCreateUser({
        UserPoolId: process.env.user_pool_id,
        Username: `${username}`,
        DesiredDeliveryMediums: ["EMAIL"],
        ForceAliasCreation: false,
        TemporaryPassword: `${password}`,
        UserAttributes: [{ Name: "email", Value: `${email}` }],
        ValidationData: []
    }, function (error, data) {
        if (error) {
            // implement error handling logic here
            return callback(error)
        }

        return callback(null,"success")
        // your logic goes within this block
    });


}