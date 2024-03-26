import { firestoreDb } from "@/libraries/firestore"
import { collection, query as firebaseQuery, getCountFromServer, or, where } from "firebase/firestore"

export const checkCodeOrUrl = async (code: string, url: string, caseSensitive = false) => {
    // Check if the request is case sensitive or not
    if (!caseSensitive) {
        code = code.toLowerCase();
        url = url.toLowerCase();
    }

    // Query the database to check if the code or url already exists
    const query = firebaseQuery(
        collection(firestoreDb, 'urls'),
        or(
            where('code', '==', code),
            where('url', '==', url),
        )
    );

    // Get the count of the query
    const countAggregate = await getCountFromServer(query);

    // Return true if the count is greater than or equal to 1
    return countAggregate.data().count >= 1;
}
