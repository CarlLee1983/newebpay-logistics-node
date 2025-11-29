import { BaseRequest } from "./requests/base.request.js";
import { MapRequest } from "./requests/map.request.js";
import { CreateOrderRequest } from "./requests/create-order.request.js";
import { QueryOrderRequest } from "./requests/query-order.request.js";
import { PrintOrderRequest } from "./requests/print-order.request.js";
import { BaseResponse } from "./responses/base.response.js";
import { CreateOrderResponse } from "./responses/create-order.response.js";
import { QueryOrderResponse } from "./responses/query-order.response.js";
import { PrintOrderResponse } from "./responses/print-order.response.js";
import { NetworkError, ApiError } from "./errors.js";
import { HttpClient, FetchHttpClient, ResponseData } from "./transport.js";

/**
 * NewebPay Logistics SDK Client.
 *
 * This class provides methods to interact with NewebPay Logistics API.
 */
export class NewebPayLogistics {
    private httpClient: HttpClient;

    /**
     * Creates an instance of NewebPayLogistics.
     *
     * @param merchantId - The Merchant ID provided by NewebPay.
     * @param hashKey - The Hash Key provided by NewebPay.
     * @param hashIV - The Hash IV provided by NewebPay.
     * @param httpClient - Optional custom HttpClient implementation. Defaults to FetchHttpClient.
     */
    constructor(
        private merchantId: string,
        private hashKey: string,
        private hashIV: string,
        httpClient?: HttpClient
    ) {
        this.httpClient = httpClient || new FetchHttpClient();
    }

    /**
     * Creates a MapRequest instance.
     *
     * @returns A new MapRequest instance.
     */
    public map(): MapRequest {
        return new MapRequest(this.merchantId, this.hashKey, this.hashIV);
    }

    /**
     * Creates a CreateOrderRequest instance.
     *
     * @returns A new CreateOrderRequest instance.
     */
    public createOrder(): CreateOrderRequest {
        return new CreateOrderRequest(this.merchantId, this.hashKey, this.hashIV);
    }

    /**
     * Creates a QueryOrderRequest instance.
     *
     * @returns A new QueryOrderRequest instance.
     */
    public queryOrder(): QueryOrderRequest {
        return new QueryOrderRequest(this.merchantId, this.hashKey, this.hashIV);
    }

    /**
     * Creates a PrintOrderRequest instance.
     *
     * @returns A new PrintOrderRequest instance.
     */
    public printOrder(): PrintOrderRequest {
        return new PrintOrderRequest(this.merchantId, this.hashKey, this.hashIV);
    }

    /**
     * Sends a request to NewebPay Logistics API.
     *
     * @param request - The request object to send.
     * @returns A promise that resolves to the response object.
     * @throws {NetworkError} If the network request fails.
     * @throws {ApiError} If the API returns a non-success HTTP status.
     */
    public async send(request: BaseRequest): Promise<BaseResponse> {
        const payload = request.getPayload();
        const url = request.getUrl();

        // Convert payload to URLSearchParams
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(payload)) {
            params.append(key, String(value));
        }

        let response: ResponseData;

        try {
            response = await this.httpClient.post(url, params);
        } catch (error) {
            throw new NetworkError('Network request failed', error);
        }

        if (!response.ok) {
            throw new ApiError(`HTTP error! status: ${response.status}`, String(response.status));
        }

        const text = await response.text();

        // Try to parse JSON, if fails return text (for HTML responses like PrintOrder)
        try {
            const json = JSON.parse(text);
            if (request instanceof CreateOrderRequest) {
                return CreateOrderResponse.from(json);
            } else if (request instanceof QueryOrderRequest) {
                return QueryOrderResponse.from(json);
            }
            return new BaseResponse(json);
        } catch (e) {
            if (request instanceof PrintOrderRequest) {
                return PrintOrderResponse.from(text);
            }
            // If we expected JSON but got text, and it's not a known HTML response, it might be an error
            // But for BaseResponse fallback, we keep it as is for now, or we could wrap it
            return new BaseResponse(text);
        }
    }
}
