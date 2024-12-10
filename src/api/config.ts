export const baseUrl = "https://seekingalpha.free.beeceptor.com";

export async function getData<T>(resource: string): Promise<T | null> {
    try {
        const response = await fetch(`${baseUrl}${resource}`);

        // Check if response is OK
        if (!response.ok) {
            throw new Error(
                `Response status: ${response.status} - ${response.statusText}`
            );
        }

        const data: T = await response.json();
        console.log("Fetched data:", data);

        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return null; // Return `null` to indicate failure.
    }
}
