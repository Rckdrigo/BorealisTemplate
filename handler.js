'use strict';

const config = require('./db.config.json')

// const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Credentials': true,
// }

const dbConfig = (context) => {
    if(context.awsRequestId.includes('offline'))
        return config.offline

    if (context.functionName.includes('-prod-'))
        return config.prod
    else if (context.functionName.includes('-test-'))
        return config.test
    else 
        return config.dev
}

module.exports.hello = async (event, context) => {   

    context.callbackWaitsForEmptyEventLoop = false;
    // const mysql = require('serverless-mysql')(
    //     { 
    //         config : dbConfig(context) 
    //     })
    
    // let select = 'SELECT NOW();';
    // let response = await mysql.query(select,[])

    return {
        // headers,
        statusCode: 200,
        body: JSON.stringify({message: "Hello world!"})   
        
    };

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
