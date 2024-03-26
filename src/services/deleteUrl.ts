import { firestoreDb } from "@/libraries/firestore"
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore"

export const deleteUrl = async (deletionKey: string) => {
    const docQuery = query(
        collection(firestoreDb, 'urls'),
        where('deletionKeyHash', '==', deletionKey),
    );

    const docs = await getDocs(docQuery);
    if (docs.empty || docs.size < 1) {
        return false;
    }

    const resolvedDocs = await Promise.allSettled(docs.docs.map(doc => deleteDoc(doc.ref)));
    return resolvedDocs.filter(result => result.status === 'fulfilled').length >= docs.size;
}