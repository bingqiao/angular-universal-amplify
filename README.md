# Angular Universal with Cognito via Amplify

Angular Universal App deployed to AWS Lambda with Authentication against AWS Cognito via Amplify.

This project is inspired by [How to secure Microservices on AWS with Cognito, API Gateway, and Lambda](https://www.freecodecamp.org/news/how-to-secure-microservices-on-aws-with-cognito-api-gateway-and-lambda-4bfaa7a6583c/) which has a react frontend and Lambda function deployed via Claudia.js.

This is only the frontend app. Please refer to the aforementioned article on how to implement the backend API that can be consumed by this project.

## Setup

Edit `src/app/service/aws-config.ts` with correct values from your AWS configuration.

* apiHost - where you Lambda function is hosted
* apiKey - api key generated from API Gateway
* region - region of User Pool and Identity Pool
* redirectSignIn - callback URL defined for App Client in User Pool
* redirectSignOut: Sign out URL defined for App Client in User Pool
* identityPoolId: Identity Pool id
* userPoolId: User Pool id
* userPoolWebClientId: App Client id
* authDomain: Congnito domain of User Pool (without `https/http`)

## Deploy

Run `build:serverless:deploy`

## Trubleshooting

A few things to check if authentication or auth request doesn't work

* Identity Pool needs to be in the same region as the API
* Identity Pool needs Invoke privilege for the API
* App Client much have a Provider created in Identity pool
* API key must be added to Usage Plan if there is one

CORS error could happen if above is not setup correctly.

