import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb"
const dbClient = new DynamoDBClient({ region: "us-east-2" })
import creatError from "http-errors"

export const setImageUrl = async (id, imageUrl) => {
    const input = {
        Key: {
            id: {
                S: id,
            },
        },
        TableName: process.env.TEST01ATABLE_NAME,
        // UpdateExpression: "set imageUrl = :imageUrl",
        // ExpressionAttributeValues: {
        //     ":imageUrl": imageUrl,
        // },
        // UpdateExpression: "set Age = :Age",
        ExpressionAttributeValues: {
            ":Age": 2,
        },
        ReturnValues: "ALL_NEW",
    }
    // return input
    console.log(input)
    // const updateItemCommand = new UpdateItemCommand(input)
    // console.log(updateItemCommand)
    // // const result = await dbClient.send(updateItemCommand)

    try {
        const updateItemCommand = new UpdateItemCommand(input)
        // console.log(updateItemCommand)
        await dbClient.send(updateItemCommand)
    } catch (error) {
        console.error(error)
        throw new creatError.InternalServerError(error)
    }
}
