/**
 * NewebPay API 回應的基本資料結構。
 */
export interface BaseResponseData {
    Status?: string;
    Message?: string;
    [key: string]: unknown;
}

/**
 * 所有 NewebPay Logistics 回應的基底類別。
 *
 * @template T - 回應資料的型別，預設為 BaseResponseData。可以是 BaseResponseData 或 string（用於 HTML 回應）。
 */
export class BaseResponse<T extends BaseResponseData | string = BaseResponseData> {
    protected data: T;

    /**
     * 建立 BaseResponse 實例。
     *
     * @param data - 原始回應資料。
     */
    constructor(data: T) {
        this.data = data;
    }

    /**
     * 取得原始回應資料。
     *
     * @returns 回應資料。
     */
    public getData(): T {
        return this.data;
    }

    /**
     * 檢查請求是否成功。
     *
     * @returns 如果狀態為 SUCCESS 則回傳 true，否則回傳 false。
     */
    public isSuccess(): boolean {
        if (typeof this.data === "string") {
            // 字串類型的回應（如 HTML）無法判斷成功與否，預設為 true
            return true;
        }
        return this.data.Status === "SUCCESS";
    }

    /**
     * 取得回應訊息。
     *
     * @returns API 回傳的訊息。
     */
    public getMessage(): string {
        if (typeof this.data === "string") {
            return "";
        }
        return this.data.Message || "";
    }

    /**
     * 取得回應狀態。
     *
     * @returns API 回傳的狀態。
     */
    public getStatus(): string | undefined {
        if (typeof this.data === "string") {
            return undefined;
        }
        return this.data.Status;
    }
}
