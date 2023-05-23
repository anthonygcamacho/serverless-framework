"use strict"

import { v4 as uuidv4 } from "uuid"
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb"
import validator from "@middy/validator"
import { transpileSchema } from "@middy/validator/transpile"
import creatError from "http-errors"
import middyMiddleware from "../middleware/middy"
import helloSchema from "../schemas/helloSchema"

const client = new DynamoDBClient({ region: "us-east-2" })

const hello = async (event, context) => {
    console.log(event)
    let { hello } = event.body
    console.log(hello)
    const now = new Date()

    const input = {
        Item: {
            id: {
                S: uuidv4().toString(),
            },
            Age: {
                N: "7",
            },
            Date: {
                S: now.toISOString(),
            },
        },
        TableName: process.env.TEST01ATABLE_NAME,
    }
    console.log(input)

    try {
        const command = new PutItemCommand(input)
        await client.send(command)
    } catch (error) {
        console.error(error)
        throw new creatError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            input,
        }),
    }
}

export const handler = middyMiddleware(hello).use(
    validator({
        eventSchema: transpileSchema(helloSchema),
        ajvOptions: {
            useDefaults: true,
            strict: false,
        },
    })
)

// -----------------------------------------------------------------------------------------

// const { v4: uuidv4 } = require("uuid")

// const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb")
// const client = new DynamoDBClient({ region: "us-east-2" })

// const hello = (event, context, callback) => {
//     // console.log(event)

//     const now = new Date()

//     const params = {
//         Item: {
//             id: {
//                 S: uuidv4().toString(),
//             },
//             Age: {
//                 N: "4",
//             },
//             Date: {
//                 S: now.toISOString(),
//             },
//             // Income: {
//             //     N: event.income,
//             // },
//         },
//         TableName: process.env.TEST01ATABLE_NAME,
//     }

//     console.log(params)

//     const command = new PutItemCommand(params)
//     client.send(command).then(
//         (data) => {
//             console.log(data)
//             callback(null, data.$metadata)
//         },
//         (error) => {
//             console.log(error)
//             callback(error)
//         }
//     )
// }

// module.exports.handler = hello
