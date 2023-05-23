import middy from "@middy/core"
import httpHeaderNormalizer from "@middy/http-header-normalizer"
import httpErrorHandler from "@middy/http-error-handler"

const middyMiddleware = (handler) =>
    middy(handler).use([httpHeaderNormalizer(), httpErrorHandler()])

export default middyMiddleware
