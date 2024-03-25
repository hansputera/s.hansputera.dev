import { DocumentUrl } from "@/declarations/url";
import { firestoreDb } from "@/libraries/firestore";
import { addDoc, collection } from "firebase/firestore";
import { generateDeletionKeyHash } from "./generateDeletionKeyHash";

export const addCodeUrl = async (url: string, code: string, sensitive: boolean): Promise<DocumentUrl> => {
    // Check if the code is case sensitive or not
    if (!sensitive) {
        code = code.toLowerCase();
    }

    // Timestamp
    const timestamp = new Date();

    // Generate a deletion key hash
    const deletionKeyHash = generateDeletionKeyHash(code, url, timestamp.getTime());

    // Create a new document
    const newDoc = await addDoc(collection(firestoreDb, 'urls'), {
        url,
        code,
        sensitive,
        deletionKeyHash,
        createdAt: timestamp,
    });

    // Return the document
    return {
        id: newDoc.id,
        url,
        shortCode: code,
        deletionKeyHash,
        createdAt: timestamp,
    };
}