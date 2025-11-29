import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";

type PrintOrderRequestContent = z.infer<
  typeof ValidatorService.printOrderRequestSchema
>;

export class PrintOrderRequest extends BaseRequest<PrintOrderRequestContent> {
  protected requestPath = "/print";

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
      ValidatorService.printOrderRequestSchema,
      this.content
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
