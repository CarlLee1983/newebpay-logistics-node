import { Environment } from "./constants.js";
import { ApiError, NetworkError } from "./errors.js";
import type { BaseRequest } from "./requests/base.request.js";
import { CreateOrderRequest } from "./requests/create-order.request.js";
import { MapRequest } from "./requests/map.request.js";
import { PrintOrderRequest } from "./requests/print-order.request.js";
import { QueryOrderRequest } from "./requests/query-order.request.js";
import { BaseResponse, type BaseResponseData } from "./responses/base.response.js";
import { CreateOrderResponse } from "./responses/create-order.response.js";
import { PrintOrderResponse } from "./responses/print-order.response.js";
import { QueryOrderResponse } from "./responses/query-order.response.js";
import { FetchHttpClient, type HttpClient, type ResponseData } from "./transport.js";

/**
 * NewebPay Logistics SDK 客戶端。
 *
 * 此類別提供與 NewebPay Logistics API 互動的方法。
 */
export class NewebPayLogistics {
    private httpClient: HttpClient;
    private environment: Environment;

    /**
     * 建立 NewebPayLogistics 實例。
     *
     * @param merchantId - NewebPay 提供的 Merchant ID。
     * @param hashKey - NewebPay 提供的 Hash Key。
     * @param hashIV - NewebPay 提供的 Hash IV。
     * @param httpClient - 可選的自訂 HttpClient 實作。預設為 FetchHttpClient。
     * @param environment - API 環境（測試或正式）。預設為測試環境。
     */
    constructor(
        private merchantId: string,
        private hashKey: string,
        private hashIV: string,
        httpClient?: HttpClient,
        environment: Environment = Environment.TEST
    ) {
        this.httpClient = httpClient || new FetchHttpClient();
        this.environment = environment;
    }

    /**
     * 建立 MapRequest 實例。
     *
     * @returns 新的 MapRequest 實例。
     */
    public map(): MapRequest {
        return new MapRequest(
            this.merchantId,
            this.hashKey,
            this.hashIV,
            undefined,
            this.environment
        );
    }

    /**
     * 建立 CreateOrderRequest 實例。
     *
     * @returns 新的 CreateOrderRequest 實例。
     */
    public createOrder(): CreateOrderRequest {
        return new CreateOrderRequest(
            this.merchantId,
            this.hashKey,
            this.hashIV,
            undefined,
            this.environment
        );
    }

    /**
     * 建立 QueryOrderRequest 實例。
     *
     * @returns 新的 QueryOrderRequest 實例。
     */
    public queryOrder(): QueryOrderRequest {
        return new QueryOrderRequest(
            this.merchantId,
            this.hashKey,
            this.hashIV,
            undefined,
            this.environment
        );
    }

    /**
     * 建立 PrintOrderRequest 實例。
     *
     * @returns 新的 PrintOrderRequest 實例。
     */
    public printOrder(): PrintOrderRequest {
        return new PrintOrderRequest(
            this.merchantId,
            this.hashKey,
            this.hashIV,
            undefined,
            this.environment
        );
    }

    /**
     * 發送請求到 NewebPay Logistics API。
     *
     * @param request - 要發送的請求物件。
     * @returns 解析為回應物件的 Promise。
     * @throws {NetworkError} 當網路請求失敗時。
     * @throws {ApiError} 當 API 回傳非成功的 HTTP 狀態時。
     */
    public async send(request: BaseRequest): Promise<BaseResponse<BaseResponseData | string>> {
        const payload = request.getPayload();
        const url = request.getUrl();

        // 將 payload 轉換為 URLSearchParams
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(payload)) {
            params.append(key, String(value));
        }

        let response: ResponseData;

        try {
            response = await this.httpClient.post(url, params);
        } catch (error) {
            throw new NetworkError("網路請求失敗", error);
        }

        if (!response.ok) {
            throw new ApiError(`HTTP 錯誤！狀態碼: ${response.status}`, String(response.status));
        }

        let text: string;
        try {
            text = await response.text();
        } catch (error) {
            throw new NetworkError("讀取回應內容失敗", error);
        }

        // 嘗試解析 JSON，如果失敗則回傳文字（用於 HTML 回應如 PrintOrder）
        try {
            const json = JSON.parse(text);
            if (request instanceof CreateOrderRequest) {
                return CreateOrderResponse.from(json);
            }
            if (request instanceof QueryOrderRequest) {
                return QueryOrderResponse.from(json);
            }
            return new BaseResponse(json);
        } catch (parseError) {
            // PrintOrder 請求預期可能是 HTML 回應
            if (request instanceof PrintOrderRequest) {
                return PrintOrderResponse.from(text);
            }
            // 對於其他請求，如果預期 JSON 但得到文字，可能是錯誤回應
            // 拋出 ApiError 以便呼叫者可以處理
            throw new ApiError(
                `無法解析回應為 JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
                String(response.status),
                text
            );
        }
    }
}
