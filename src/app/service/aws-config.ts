export const config = {
    apiHost: '',
    apiKey: '',
    region: 'eu-west-2',
    redirectSignIn: '',
    redirectSignOut: '',
    identityPoolId: '',
    userPoolId: '',
    userPoolWebClientId: '',
    authDomain: ''
}

const oauth = {
    domain: config.authDomain,
    scope: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin"
    ],
    redirectSignIn: config.redirectSignIn,
    redirectSignOut: config.redirectSignOut,
    responseType: "code"
  };
  
export const awsConfig = {
    Analytics: {
        disabled: true
    },
    Auth: {
        oauth: oauth,
        region: config.region,
        identityPoolId: config.identityPoolId,
        userPoolId: config.userPoolId,
        userPoolWebClientId: config.userPoolWebClientId
    }
};
  
export const signInUrl=`https://${
    awsConfig.Auth.oauth.domain
    }/login?redirect_uri=${awsConfig.Auth.oauth.redirectSignIn}&response_type=${
    awsConfig.Auth.oauth.responseType
    }&client_id=${awsConfig.Auth.userPoolWebClientId}`;