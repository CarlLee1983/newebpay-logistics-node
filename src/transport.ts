export interface ResponseData {
    ok: boolean;
    status: number;
    text(): Promise<string>;
}

export interface HttpClient {
    post(url: string, body: URLSearchParams): Promise<ResponseData>;
}

export class FetchHttpClient implements HttpClient {
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
