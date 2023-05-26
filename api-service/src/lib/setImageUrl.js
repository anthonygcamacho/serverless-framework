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
        UpdateExpression: "set imageUrl = :imageUrl",
        ExpressionAttributeValues: {
            ":imageUrl": {
                S: imageUrl,
            },
        },
        ReturnValues: "ALL_NEW",
    }
    console.log(input)

    try {
        const updateItemCommand = new UpdateItemCommand(input)
        // console.log(updateItemCommand)
        let response = await dbClient.send(updateItemCommand)
        return response
    } catch (error) {
        console.error(error)
        throw new creatError.InternalServerError(error)
    }
}
