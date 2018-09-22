let AWS = require('aws-sdk');
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {

    let {username,password} = event;
    
    cognito_idp.adminCreateUser({
        UserPoolId: process.env.UserPoolId_cognitodigitalsignage,
        Username: `${username}`,
        DesiredDeliveryMediums: [],
        ForceAliasCreation: false,
        TemporaryPassword: `${password}`,
        UserAttributes: [],
        ValidationData: [{ Name: "", Value: "" }]
    }, function (error, data) {
        if (error) {
            // implement error handling logic here
            throw error;
            return callback(error, "User Creation Failed")
        }
        // your logic goes within this block
        callback(null, 'Successfully executed');
    });

}