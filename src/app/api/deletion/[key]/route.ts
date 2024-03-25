import { deleteUrl } from "@/services/deleteUrl";
import { NextApiRequest } from "next";

export async function POST(_request: NextApiRequest, { params }: { params: { key: string } }) {
    // Get the key from the params
    const { key } = params;

    // Delete the document
    const deleted = await deleteUrl(key);

    // Return the document
    return Response.json({
        message: deleted ? 'Document deleted' : 'Document not found',
    });
}