/**
 * HTTP 回應資料的介面。
 */
export interface ResponseData {
    ok: boolean;
    status: number;
    text(): Promise<string>;
}

/**
 * HTTP 客戶端的介面。
 */
export interface HttpClient {
    /**
     * 發送 POST 請求。
     *
     * @param url - 要發送請求的 URL。
     * @param body - 請求的 body（URLSearchParams）。
     * @returns 解析為回應資料的 Promise。
     */
    post(url: string, body: URLSearchParams): Promise<ResponseData>;
}

/**
 * 使用 Fetch API 的 HttpClient 預設實作。
 */
export class FetchHttpClient implements HttpClient {
    /**
     * 建立 FetchHttpClient 實例。
     *
     * @param customFetch - 可選的自訂 fetch 實作（例如：用於測試或沒有全域 fetch 的 Node.js 版本）。
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
