let AWS = require('aws-sdk');
const AmazonCognitoIdentity= require("amazon-cognito-identity-js");
const cognito_idp = new AWS.CognitoIdentityServiceProvider();

exports.handler = function (event, context, callback) {
    //const AmazonCognitoIdentity = cognito_idp //new AWS.CognitoIdentity(cognito_idp);
   

    let { username, password } = event;

    var authenticationData = {
        Username: username,
        Password: password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId: process.env.user_pool_id,
        ClientId: process.env.app_id
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();

            /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
            var idToken = result.idToken.jwtToken;
            callback(null, idToken)
        },

        onFailure: function (err) {
            callback(err.message)
        },

    });

}