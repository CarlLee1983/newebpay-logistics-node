import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";
import { LgsType, ShipType, TradeType } from "../constants.js";

type CreateOrderRequestContent = z.infer<
  typeof ValidatorService.createOrderRequestSchema
>;

export class CreateOrderRequest extends BaseRequest<CreateOrderRequestContent> {
  protected requestPath = "/create";

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
      ValidatorService.createOrderRequestSchema,
      this.content
    );
  }

  public setMerchantTradeNo(tradeNo: string): this {
    this.content.MerchantOrderNo = tradeNo;
    return this;
  }

  public setTradeType(type: TradeType): this {
    this.content.TradeType = type;
    return this;
  }

  public setUserName(name: string): this {
    this.content.UserName = name;
    return this;
  }

  public setUserTel(tel: string): this {
    this.content.UserTel = tel;
    return this;
  }

  public setUserEmail(email: string): this {
    this.content.UserEmail = email;
    return this;
  }

  public setStoreID(id: string): this {
    this.content.StoreID = id;
    return this;
  }

  public setAmt(amt: number): this {
    this.content.Amt = amt;
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

  public setTimeStamp(timeStamp: string | number): this {
    this.content.TimeStamp = timeStamp;
    return this;
  }

  public setReceiverName(name: string): this {
    this.content.ReceiverName = name;
    return this;
  }

  public setReceiverPhone(phone: string): this {
    this.content.ReceiverPhone = phone;
    return this;
  }

  public setReceiverCellPhone(cellPhone: string): this {
    this.content.ReceiverCellPhone = cellPhone;
    return this;
  }

  public setReceiverEmail(email: string): this {
    this.content.ReceiverEmail = email;
    return this;
  }

  public setLogisticsSubType(subType: string): this {
    this.content.LogisticsSubType = subType;
    return this;
  }
}
