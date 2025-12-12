import { BaseResponse } from "./base.response.js";

/**
 * QueryOrder 請求的回應資料結構。
 */
export interface QueryOrderResponseData {
    Status: string;
    Message: string;
    Result?: {
        MerchantID: string;
        MerchantOrderNo: string;
        LogisticsStatus: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

/**
 * QueryOrder 請求的回應。
 */
export class QueryOrderResponse extends BaseResponse<QueryOrderResponseData> {
    /**
     * 從原始資料建立 QueryOrderResponse。
     *
     * @param data - 原始回應資料。
     * @returns 新的 QueryOrderResponse 實例。
     */
    public static from(data: unknown): QueryOrderResponse {
        return new QueryOrderResponse(data as QueryOrderResponseData);
    }
}
