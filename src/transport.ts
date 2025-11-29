/**
 * Interface for HTTP response data.
 */
export interface ResponseData {
    ok: boolean;
    status: number;
    text(): Promise<string>;
}

/**
 * Interface for an HTTP client.
 */
export interface HttpClient {
    /**
     * Sends a POST request.
     *
     * @param url - The URL to send the request to.
     * @param body - The body of the request (URLSearchParams).
     * @returns A promise that resolves to the response data.
     */
    post(url: string, body: URLSearchParams): Promise<ResponseData>;
}

/**
 * Default implementation of HttpClient using the Fetch API.
 */
export class FetchHttpClient implements HttpClient {
    /**
     * Creates an instance of FetchHttpClient.
     *
     * @param customFetch - Optional custom fetch implementation (e.g., for testing or Node.js versions without global fetch).
     */
    constructor(private customFetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) { }

    public async post(url: string, body: URLSearchParams): Promise<ResponseData> {
        const fetchFn = this.customFetch || fetch;
        const response = await fetchFn(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'NewebPay-Logistics-Node-SDK',
            },
            body: body,
        });

        return response;
    }
}
