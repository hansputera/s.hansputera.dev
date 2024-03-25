import { DocumentUrl } from "@/declarations/url";
import { firestoreDb } from "@/libraries/firestore";
import { collection, getDocs, query, where } from "firebase/firestore"

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

    return data;
}