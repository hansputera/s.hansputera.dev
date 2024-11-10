export const checkUrlService = async (url: string): Promise<boolean> => {
    try {
        await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            },
            signal: AbortSignal.timeout(5000),
        });

        return true;
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'TimeoutError') {
                return false;
            } else {
                return true;
            }
        }

        return false;
    }
}
