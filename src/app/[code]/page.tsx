'use server';

import { getCode } from "@/services/getCode";
import { RedirectType, redirect } from "next/navigation";

export default async function CodePage({params}:{params: {code: string}}) {
 
    // Get the code from the params
    const { code } = params;

    // Get the document
    const document = await getCode(code, true);

    // Check if the document is not found
    if (!document) {
        return (
            <div className="text-center">
                <pre>
                    Code not found
                </pre>
            </div>
        )
    }

    return redirect(document.url, RedirectType.replace);
}