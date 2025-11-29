import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";
import { LgsType, ShipType } from "../constants.js";

type MapRequestContent = z.infer<typeof ValidatorService.mapRequestSchema>;

export class MapRequest extends BaseRequest<MapRequestContent> {
  protected requestPath = "/map";

  constructor(
    merchantId: string,
    hashKey: string,
    hashIV: string,
    encryptionService?: EncryptionService
  ) {
    super(merchantId, hashKey, hashIV, encryptionService);
  }

  protected validate(): void {
    ValidatorService.validate(ValidatorService.mapRequestSchema, this.content);
  }

  public setMerchantTradeNo(tradeNo: string): this {
    this.content.MerchantOrderNo = tradeNo;
    return this;
  }

  public setLgsType(type: LgsType): this {
    this.content.LgsType = type;
    return this;
  }

  public setShipType(type: ShipType): this {
    this.content.ShipType = type;
    return this;
  }

  public setReturnURL(url: string): this {
    this.content.ReturnURL = url;
    return this;
  }

  public setTimeStamp(timeStamp: string | number): this {
    this.content.TimeStamp = timeStamp;
    return this;
  }

  public setLogisticsSubType(subType: string): this {
    this.content.LogisticsSubType = subType;
    return this;
  }

  public setIsCollection(isCollection: "Y" | "N"): this {
    this.content.IsCollection = isCollection;
    return this;
  }

  public setServerReplyURL(url: string): this {
    this.content.ServerReplyURL = url;
    return this;
  }

  public setExtraData(data: string): this {
    this.content.ExtraData = data;
    return this;
  }
}
