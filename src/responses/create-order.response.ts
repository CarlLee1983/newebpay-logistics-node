import { BaseResponse } from "./base.response.js";

/**
 * CreateOrder 請求的回應資料結構。
 */
export interface CreateOrderResponseData {
    Status: string;
    Message: string;
    Result?: {
        MerchantID: string;
        MerchantOrderNo: string;
        TradeNo: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

/**
 * CreateOrder 請求的回應。
 */
export class CreateOrderResponse extends BaseResponse<CreateOrderResponseData> {
    /**
     * 從原始資料建立 CreateOrderResponse。
     *
     * @param data - 原始回應資料。
     * @returns 新的 CreateOrderResponse 實例。
     */
    public static from(data: unknown): CreateOrderResponse {
        return new CreateOrderResponse(data as CreateOrderResponseData);
    }
}
