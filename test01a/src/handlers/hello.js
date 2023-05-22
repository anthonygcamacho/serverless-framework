const { v4: uuidv4 } = require("uuid")
// const AWS = require("aws-sdk")

const { DynamoDB } = require("@aws-sdk/client-dynamodb")
const dynamodb = new DynamoDB({ region: "us-west-2" })

// const dynamodb = AWS.DynamoDB.DocumentClient()

const hello = async (event, context) => {
    let { hello } = JSON.parse(event.body)
    const now = new Date()

    // dbObj = {
    //     id: uuidv4(),
    //     name: "Something heren",
    //     createdAt: now.toISOString(),
    // }

    // await dynamodb
    //     .put({
    //         TableName: "Test01ATable",
    //         Item: dbObj,
    //     })
    //     .promise()

    const params = {
        Item: {
            UserId: {
                S: uuidv4(),
            },
            name: {
                S: "Bones",
            },
            age: {
                N: 21,
            },
            createdAt: {
                D: now.toISOString(),
            },
        },
        TableName: "Test01ATable",
    }

    console.log(params)

    await dynamodb.putItem(params)

    return {
        statusCode: 200,
        body: JSON.stringify({
            hello,
            params,
        }),
    }
}

module.exports.handler = hello
