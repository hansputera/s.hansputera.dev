import { DocumentUrl } from "@/declarations/url";
import { firestoreDb } from "@/libraries/firestore";
import { collection, getDocs, query, where } from "firebase/firestore"
import { deleteUrl } from "./deleteUrl";

export const getCode = async <R extends boolean>(code: string, removeKey: R): Promise<R extends true ? Omit<DocumentUrl, 'deletionKeyHash'> | undefined : DocumentUrl | undefined> => {
    const docQuery = query(
        collection(firestoreDb, 'urls'),
        where('code', '==', code),
    );

    const docs = await getDocs(docQuery);
    if (docs.empty || docs.size < 1) {
        return undefined;
    }

    const data = docs.docs[0].data() as DocumentUrl;
    if (removeKey) {
        Reflect.deleteProperty(data, 'deletionKeyHash');
    }

    // Check if the document is older than 14 days
    if ((Date.now() - new Date(data.createdAt).getMilliseconds()) >= 1209600000) {
        // Delete the document
        await deleteUrl(data.deletionKeyHash);
    }

    return data;
}