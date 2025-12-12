import { API_BASE_URLS, Environment, RespondType, Version } from "../constants.js";
import { EncryptionService } from "../services/encryption.service.js";

/**
 * 所有 NewebPay Logistics 請求的抽象基底類別。
 *
 * @template T - 請求內容的型別。
 */
export abstract class BaseRequest<T = Record<string, unknown>> {
    protected content: T = {} as T;
    protected abstract requestPath: string;
    protected encryptionService: EncryptionService;
    protected environment: Environment;

    /**
     * 建立 BaseRequest 實例。
     *
     * @param merchantId - NewebPay 提供的 Merchant ID。
     * @param hashKey - NewebPay 提供的 Hash Key。
     * @param hashIV - NewebPay 提供的 Hash IV。
     * @param encryptionService - 可選的自訂 EncryptionService。
     * @param environment - API 環境（測試或正式）。預設為測試環境。
     */
    constructor(
        protected merchantId: string,
        protected hashKey: string,
        protected hashIV: string,
        encryptionService?: EncryptionService,
        environment: Environment = Environment.TEST
    ) {
        this.encryptionService = encryptionService || new EncryptionService();
        this.environment = environment;
    }

    /**
     * 驗證請求內容。
     *
     * @throws {ValidationError} 當驗證失敗時。
     */
    protected abstract validate(): void;

    /**
     * 產生請求的 payload。
     *
     * 此方法會驗證內容、加密並產生雜湊。
     *
     * @returns 包含加密資料和雜湊的 payload 物件。
     */
    public getPayload(): Record<string, string> {
        this.validate();

        const encryptedData = this.encryptionService.encrypt(
            this.content as unknown as Record<string, string | number>,
            this.hashKey,
            this.hashIV
        );
        const hashData = this.encryptionService.hash(encryptedData, this.hashKey, this.hashIV);

        return {
            MerchantID_: this.merchantId,
            PostData_: encryptedData,
            UID_: this.merchantId, // NewebPay 在某些情境下也會使用 UID_，與 PHP SDK 保持一致
            EncryptData_: encryptedData,
            HashData_: hashData,
            Version_: Version.V_1_0,
            RespondType_: RespondType.JSON,
        };
    }

    /**
     * 取得請求的完整 URL。
     *
     * @returns API URL。
     */
    public getUrl(): string {
        return `${API_BASE_URLS[this.environment]}${this.requestPath}`;
    }

    /**
     * 設定 Merchant Trade Number（所有請求共用）。
     *
     * @param tradeNo - 商家的唯一交易編號。
     * @returns BaseRequest 實例，支援鏈式呼叫。
     */
    public setMerchantTradeNo(tradeNo: string): this {
        (this.content as Record<string, unknown>).MerchantOrderNo = tradeNo;
        return this;
    }

    /**
     * 設定 Timestamp（所有請求共用）。
     *
     * @param timeStamp - 請求的時間戳記。
     * @returns BaseRequest 實例，支援鏈式呼叫。
     */
    public setTimeStamp(timeStamp: string | number): this {
        (this.content as Record<string, unknown>).TimeStamp = timeStamp;
        return this;
    }
}
