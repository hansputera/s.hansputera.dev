import { ShortPayload } from "@/declarations/shortPayload";
import { addCodeUrl } from "@/services/addCodeUrl";
import { checkCodeOrUrl } from "@/services/checkCodeUrl";
import { safeJsonParse } from "@/utilities/safeJsonParse";
import { NextApiRequest } from "next";

export async function POST(request: NextApiRequest) {
    // Checking payload is valid or not
    const payload = safeJsonParse<ShortPayload>(request.body);

    // If payload is not valid, return 400 status code
    if (!payload) {
        return Response.json({
            message: 'I couldn\'t parse requested payload',
        }, {
            status: 400,
        });
    }

    // Destructuring values from payload (we could use the value easier)
    const {
        code,
        url,
        sensitive,
    } = payload;

    // We should check the code OR url is exists on database
    const dataExistsBoolean = await checkCodeOrUrl(code, url, sensitive);

    // If data exists, return 400 status code
    if (dataExistsBoolean) {
        return Response.json({
            message: 'URL or code already exists',
        }, {
            status: 400,
        });
    }

    // Add the code to the database
    const shortenedData = await addCodeUrl(url, code, sensitive);

    // If we couldn't add the code to the database, return 500 status code
    if (!shortenedData) {
        return Response.json({
            message: 'Couldn\'t shorten the URL',
        }, {
            status: 500,
        });
    }

    // Return the shortened data
    return Response.json({
        message: 'Shortened the URL',
        data: shortenedData,
    });
}