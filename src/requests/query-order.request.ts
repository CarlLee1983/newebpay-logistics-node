import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";

type QueryOrderRequestContent = z.infer<
  typeof ValidatorService.queryOrderRequestSchema
>;

export class QueryOrderRequest extends BaseRequest<QueryOrderRequestContent> {
  protected requestPath = "/query";

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

  public setMerchantTradeNo(tradeNo: string): this {
    this.content.MerchantOrderNo = tradeNo;
    return this;
  }

  public setTimeStamp(timeStamp: string | number): this {
    this.content.TimeStamp = timeStamp;
    return this;
  }

  public setLogisticsID(id: string): this {
    this.content.LogisticsID = id;
    return this;
  }
}
