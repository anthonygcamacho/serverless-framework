const hello = async (event, context) => {
    let { hello } = JSON.parse(event.body)
    const now = new Date()

    dbObj = {
        name: "Something heren",
        createdAt: now.toISOString(),
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            hello,
            dbObj,
        }),
    }
}

module.exports.handler = hello
