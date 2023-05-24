// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sesv2/

"use strict"

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"

const client = new SESv2Client({ region: "us-east-2" })

const sendMail = async (event, context) => {
    // console.log(event)
    const record = event.Records[0]
    // console.log(record)

    const email = JSON.parse(record.body)
    const { subject, body, recipient } = email

    const input = {
        FromEmailAddress: "anthony.g.camacho@gmail.com",
        Destination: {
            ToAddresses: [recipient],
            // CcAddresses: ["STRING_VALUE"],
            // BccAddresses: ["STRING_VALUE"],
        },
        // ReplyToAddresses: ["noreply@gmail.com"],
        Content: {
            Simple: {
                Subject: {
                    // Content
                    Data: subject, // required
                    // Charset: "STRING_VALUE",
                },
                Body: {
                    Text: {
                        Data: body, // required
                        // Charset: "STRING_VALUE",
                    },
                    // Html: {
                    //     Data: "STRING_VALUE", // required
                    //     Charset: "STRING_VALUE",
                    // },
                },
            },
            // Raw: {
            //     // RawMessage
            //     Data: "BLOB_VALUE", // required
            // },
            // Template: {
            //     // Template
            //     TemplateName: "STRING_VALUE",
            //     TemplateArn: "STRING_VALUE",
            //     TemplateData: "STRING_VALUE",
            // },
        },
    }

    try {
        const command = new SendEmailCommand(input)
        const response = await client.send(command)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}

export const handler = sendMail
