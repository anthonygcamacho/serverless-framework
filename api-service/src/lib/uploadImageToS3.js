import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
const client = new S3Client({ region: "us-east-2" })
import creatError from "http-errors"

export const uploadImageToS3 = async (key, body) => {
    const params = {
        Bucket: process.env.S3BUCKET_NAME,
        Key: key,
        Body: body,
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
    }

    try {
        const command = new PutObjectCommand(params)
        await client.send(command)
        return `https://${process.env.S3BUCKET_NAME}.s3.us-east-2.amazonaws.com/${key}`
    } catch (error) {
        console.error(error)
        throw new creatError.InternalServerError(error)
    }
}
