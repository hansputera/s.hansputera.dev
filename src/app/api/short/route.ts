import { ShortPayload } from "@/declarations/shortPayload";
import { addCodeUrl } from "@/services/addCodeUrl";
import { checkCodeOrUrl } from "@/services/checkCodeUrl";
import { checkUrlService } from "@/services/checkUrl";
import { generateShortCode } from "@/utilities/generateShortCode";
import { normalizeCode } from "@/utilities/normalizeCode";
import { safeJsonParse } from "@/utilities/safeJsonParse";
import { NextRequest } from "next/server";
import normalizeUrl from 'normalize-url';

export async function POST(request: NextRequest) {
    // Checking payload is valid or not
    const payload = safeJsonParse<ShortPayload>(await request.text());

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

    const generatedCode = normalizeCode(code.length ? code : generateShortCode(8));

    // We should check the code OR url is exists on database
    const dataExistsBoolean = await checkCodeOrUrl(generatedCode, normalizeUrl(url), sensitive);

    // If data exists, return 400 status code
    if (dataExistsBoolean) {
        return Response.json({
            message: 'URL or code already exists or they\'re not allowed to use.',
        }, {
            status: 400,
        });
    }

    const urlExists = await checkUrlService(normalizeUrl(url));
    if (!urlExists) {
        return Response.json({
            message: 'URL is not reachable',
        }, {
            status: 400,
        });
    }

    // Add the code to the database
    const shortenedData = await addCodeUrl(normalizeUrl(url), generatedCode, sensitive);

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