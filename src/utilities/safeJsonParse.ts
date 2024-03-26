export const safeJsonParse = <T>(data: string, defaultValue?: T): T | undefined => {
    // This function is used to parse JSON data safely
    try {
        return JSON.parse(data);
    } catch {
        return defaultValue ?? undefined;
    }
}
