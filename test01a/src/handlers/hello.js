"use strict"

// const { v4: uuidv4 } = require("uuid")
// const AWS = require("aws-sdk")

// const documentClient = new AWS.DynamoDB.DocumentClient()

// const hello = async (event, context) => {
//     let { hello } = JSON.parse(event.body)
//     const now = new Date()

//     let dbObj = {
//         id: uuidv4(),
//         name: "Something heren",
//         createdAt: now.toISOString(),
//     }

//     console.log(dbObj)

//     try {
//         await documentClient
//             .put({
//                 TableName: "Test01ATable",
//                 Item: dbObj,
//             })
//             .promise()
//         return {
//             statusCode: 200,
//             body: JSON.stringify({
//                 hello,
//                 params,
//             }),
//         }
//     } catch (error) {
//         console.log(error)
//         return {
//             statusCode: 500,
//             body: JSON.stringify({
//                 error,
//             }),
//         }
//     }
// }

// module.exports.handler = hello

const { v4: uuidv4 } = require("uuid")

const { DynamoDB } = require("@aws-sdk/client-dynamodb")
const dynamodb = new DynamoDB({ region: "us-east-2" })

const hello = (event, context, callback) => {
    console.log(event)

    const params = {
        Item: {
            id: {
                S: uuidv4().toString(),
            },
            Age: {
                N: "3",
            },
            // Height: {
            //     N: event.height,
            // },
            // Income: {
            //     N: event.income,
            // },
        },
        TableName: process.env.TEST01ATABLE_NAME,
    }

    console.log(params)

    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.log(err)
            callback(err)
        } else {
            console.log(data)
            callback(null, data.$metadata)
        }
    })
}

module.exports.handler = hello
