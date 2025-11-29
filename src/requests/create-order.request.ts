import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";
import { LgsType, ShipType, TradeType } from "../constants.js";

type CreateOrderRequestContent = z.infer<
  typeof ValidatorService.createOrderRequestSchema
>;

/**
 * Request for creating a logistics order.
 */
export class CreateOrderRequest extends BaseRequest<CreateOrderRequestContent> {
  protected requestPath = "/create";

  /**
   * Creates an instance of CreateOrderRequest.
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
      ValidatorService.createOrderRequestSchema,
      this.content
    );
  }

  /**
   * Sets the Merchant Trade Number.
   *
   * @param tradeNo - Unique trade number for the merchant.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setMerchantTradeNo(tradeNo: string): this {
    this.content.MerchantOrderNo = tradeNo;
    return this;
  }

  /**
   * Sets the Trade Type.
   *
   * @param type - The trade type (e.g., PAYMENT, NO_PAYMENT).
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setTradeType(type: TradeType): this {
    this.content.TradeType = type;
    return this;
  }

  /**
   * Sets the User Name.
   *
   * @param name - The name of the sender.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setUserName(name: string): this {
    this.content.UserName = name;
    return this;
  }

  /**
   * Sets the User Telephone.
   *
   * @param tel - The telephone number of the sender.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setUserTel(tel: string): this {
    this.content.UserTel = tel;
    return this;
  }

  /**
   * Sets the User Email.
   *
   * @param email - The email address of the sender.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setUserEmail(email: string): this {
    this.content.UserEmail = email;
    return this;
  }

  /**
   * Sets the Store ID.
   *
   * @param id - The ID of the store (e.g., CVS store ID).
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setStoreID(id: string): this {
    this.content.StoreID = id;
    return this;
  }

  /**
   * Sets the Amount.
   *
   * @param amt - The amount of the order.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setAmt(amt: number): this {
    this.content.Amt = amt;
    return this;
  }

  /**
   * Sets the Logistics Type.
   *
   * @param type - The logistics type (e.g., CVS, HOME).
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setLgsType(type: LgsType): this {
    this.content.LgsType = type;
    return this;
  }

  /**
   * Sets the Ship Type.
   *
   * @param type - The ship type (e.g., B2C, C2C).
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setShipType(type: ShipType): this {
    this.content.ShipType = type;
    return this;
  }

  /**
   * Sets the Timestamp.
   *
   * @param timeStamp - The timestamp of the request.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setTimeStamp(timeStamp: string | number): this {
    this.content.TimeStamp = timeStamp;
    return this;
  }

  /**
   * Sets the Receiver Name.
   *
   * @param name - The name of the receiver.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setReceiverName(name: string): this {
    this.content.ReceiverName = name;
    return this;
  }

  /**
   * Sets the Receiver Phone.
   *
   * @param phone - The phone number of the receiver.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setReceiverPhone(phone: string): this {
    this.content.ReceiverPhone = phone;
    return this;
  }

  /**
   * Sets the Receiver Cell Phone.
   *
   * @param cellPhone - The cell phone number of the receiver.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setReceiverCellPhone(cellPhone: string): this {
    this.content.ReceiverCellPhone = cellPhone;
    return this;
  }

  /**
   * Sets the Receiver Email.
   *
   * @param email - The email address of the receiver.
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setReceiverEmail(email: string): this {
    this.content.ReceiverEmail = email;
    return this;
  }

  /**
   * Sets the Logistics Sub Type.
   *
   * @param subType - The logistics sub type (e.g., UNIMART, FAMI).
   * @returns The CreateOrderRequest instance for chaining.
   */
  public setLogisticsSubType(subType: string): this {
    this.content.LogisticsSubType = subType;
    return this;
  }
}
