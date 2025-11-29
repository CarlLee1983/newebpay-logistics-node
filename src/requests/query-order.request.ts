import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";

type QueryOrderRequestContent = z.infer<
  typeof ValidatorService.queryOrderRequestSchema
>;

/**
 * Request for querying a logistics order.
 */
export class QueryOrderRequest extends BaseRequest<QueryOrderRequestContent> {
  protected requestPath = "/query";

  /**
   * Creates an instance of QueryOrderRequest.
   *
   * @param merchantId - The Merchant ID.
   * @param hashKey - The Hash Key.
   * @param hashIV - The Hash IV.
   * @param encryptionService - Optional custom EncryptionService.
   */
  constructor(
    merchantId: string,
    hashKey: string,
    hashIV: string,
    encryptionService?: EncryptionService
  ) {
    super(merchantId, hashKey, hashIV, encryptionService);
  }

  protected validate(): void {
    ValidatorService.validate(
      ValidatorService.queryOrderRequestSchema,
      this.content,
    );
  }

  /**
   * Sets the Merchant Trade Number.
   *
   * @param tradeNo - Unique trade number for the merchant.
   * @returns The QueryOrderRequest instance for chaining.
   */
  public setMerchantTradeNo(tradeNo: string): this {
    this.content.MerchantOrderNo = tradeNo;
    return this;
  }

  /**
   * Sets the Timestamp.
   *
   * @param timeStamp - The timestamp of the request.
   * @returns The QueryOrderRequest instance for chaining.
   */
  public setTimeStamp(timeStamp: string | number): this {
    this.content.TimeStamp = timeStamp;
    return this;
  }

  /**
   * Sets the Logistics ID.
   *
   * @param id - The logistics ID (shipping code).
   * @returns The QueryOrderRequest instance for chaining.
   */
  public setLogisticsID(id: string): this {
    this.content.LogisticsID = id;
    return this;
  }
}
