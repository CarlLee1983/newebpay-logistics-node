import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";
import { Environment } from "../constants.js";

type QueryOrderRequestContent = z.infer<
  typeof ValidatorService.queryOrderRequestSchema
>;

/**
 * 查詢物流訂單的請求。
 */
export class QueryOrderRequest extends BaseRequest<QueryOrderRequestContent> {
  protected requestPath = "/query";

  /**
   * 建立 QueryOrderRequest 實例。
   *
   * @param merchantId - Merchant ID。
   * @param hashKey - Hash Key。
   * @param hashIV - Hash IV。
   * @param encryptionService - 可選的自訂 EncryptionService。
   * @param environment - API 環境（測試或正式）。預設為測試環境。
   */
  constructor(
    merchantId: string,
    hashKey: string,
    hashIV: string,
    encryptionService?: EncryptionService,
    environment?: Environment
  ) {
    super(merchantId, hashKey, hashIV, encryptionService, environment);
  }

  protected validate(): void {
    ValidatorService.validate(
      ValidatorService.queryOrderRequestSchema,
      this.content,
    );
  }

  /**
   * 設定物流 ID。
   *
   * @param id - 物流 ID（配送代碼）。
   * @returns QueryOrderRequest 實例，支援鏈式呼叫。
   */
  public setLogisticsID(id: string): this {
    this.content.LogisticsID = id;
    return this;
  }
}
