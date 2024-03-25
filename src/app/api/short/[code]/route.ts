import { getCode } from "@/services/getCode";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { code: string } }) {
    // Get the code from the params
    const { code } = params;

    // Get the document
    const document = await getCode(code, true);
    // Check if the document is not found
    if (!document) {
        return Response.json({
            message: 'Code not found',
        }, {
            status: 404,
        });
    }

    // Return the document
    return Response.json({
        message: 'Code found',
        data: document,
    });
}
