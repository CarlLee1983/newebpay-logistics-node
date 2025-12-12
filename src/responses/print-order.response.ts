import { BaseResponse } from "./base.response.js";

/**
 * PrintOrder 請求的回應資料結構。
 * 可以是字串（HTML）或物件。
 */
export type PrintOrderResponseData = string | { Result?: string; [key: string]: unknown };

/**
 * PrintOrder 請求的回應。
 */
export class PrintOrderResponse extends BaseResponse<PrintOrderResponseData> {
    /**
     * 從原始資料建立 PrintOrderResponse。
     *
     * @param data - 原始回應資料。
     * @returns 新的 PrintOrderResponse 實例。
     */
    public static from(data: unknown): PrintOrderResponse {
        return new PrintOrderResponse(data as PrintOrderResponseData);
    }

    /**
     * 取得用於列印的 HTML 內容。
     *
     * @returns HTML 字串。
     */
    public getHtmlContent(): string {
        // PrintOrder 通常直接回傳 HTML 內容或在欄位中
        // 如果回應是 HTML 字串，this.data 可能是字串
        if (typeof this.data === "string") {
            return this.data;
        }
        return (this.data as { Result?: string }).Result || "";
    }
}
