/**
 * NewebPay Logistics SDK 的基底錯誤類別。
 */
export class NewebPayError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * 當網路請求失敗時拋出的錯誤。
 */
export class NetworkError extends NewebPayError {
    /**
     * 建立 NetworkError 實例。
     *
     * @param message - 錯誤訊息。
     * @param originalError - 導致失敗的原始錯誤。
     */
    constructor(
        message: string,
        public readonly originalError?: unknown
    ) {
        super(message);
    }
}

/**
 * 當 API 回傳非成功狀態時拋出的錯誤。
 */
export class ApiError extends NewebPayError {
    /**
     * 建立 ApiError 實例。
     *
     * @param message - 錯誤訊息。
     * @param status - HTTP 狀態碼或 API 狀態。
     * @param data - 與錯誤相關的額外資料。
     */
    constructor(
        message: string,
        public readonly status: string,
        public readonly data?: unknown
    ) {
        super(message);
    }
}

/**
 * 當請求驗證失敗時拋出的錯誤。
 */
export class ValidationError extends NewebPayError {}
