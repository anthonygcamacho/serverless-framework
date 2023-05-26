import creatError from "http-errors"
import { uploadImageToS3 } from "../lib/uploadImageToS3"
import { setImageUrl } from "../lib/setImageUrl"
import middyMiddleware from "../middleware/middy"

const uploadImage = async (event) => {
    const { id } = event.pathParameters
    console.log(id)
    const base64 = event.body.replace(/^data:image\/\w+;base64,/, "")
    const buffer = Buffer.from(base64, "base64")

    let updatedDoc

    try {
        const imageUrl = await uploadImageToS3(`${id}.png`, buffer)
        console.log(imageUrl)
        updatedDoc = await setImageUrl(id, imageUrl)
        // console.log("updatedDoc", updatedDoc)
    } catch (error) {
        console.error(error)
        throw new creatError.InternalServerError(error)
    }

    console.log(updatedDoc)

    return {
        statusCode: 200,
        body: JSON.stringify(updatedDoc),
    }
}

export const handler = uploadImage
