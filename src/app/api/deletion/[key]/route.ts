import { deleteUrl } from "@/services/deleteUrl";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { key: string } }) {
    // Get the key from the params
    const { key } = params;

    // Delete the document
    const deleted = await deleteUrl(key);

    // Return the document
    return Response.json({
        message: deleted ? 'Document deleted' : 'Document not found',
    });
}