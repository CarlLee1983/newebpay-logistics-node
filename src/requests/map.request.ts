import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";
import { LgsType, ShipType } from "../constants.js";

type MapRequestContent = z.infer<typeof ValidatorService.mapRequestSchema>;

/**
 * Request for Map interface (Logistics Selection).
 */
export class MapRequest extends BaseRequest<MapRequestContent> {
  protected requestPath = "/map";

  /**
   * Creates an instance of MapRequest.
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
    ValidatorService.validate(ValidatorService.mapRequestSchema, this.content);
  }

  /**
   * Sets the Merchant Trade Number.
   *
   * @param tradeNo - Unique trade number for the merchant.
   * @returns The MapRequest instance for chaining.
   */
  public setMerchantTradeNo(tradeNo: string): this {
    this.content.MerchantOrderNo = tradeNo;
    return this;
  }

  /**
   * Sets the Logistics Type.
   *
   * @param type - The logistics type (e.g., CVS, HOME).
   * @returns The MapRequest instance for chaining.
   */
  public setLgsType(type: LgsType): this {
    this.content.LgsType = type;
    return this;
  }

  /**
   * Sets the Ship Type.
   *
   * @param type - The ship type (e.g., B2C, C2C).
   * @returns The MapRequest instance for chaining.
   */
  public setShipType(type: ShipType): this {
    this.content.ShipType = type;
    return this;
  }

  /**
   * Sets the Return URL.
   *
   * @param url - The URL to redirect after map selection.
   * @returns The MapRequest instance for chaining.
   */
  public setReturnURL(url: string): this {
    this.content.ReturnURL = url;
    return this;
  }

  /**
   * Sets the Timestamp.
   *
   * @param timeStamp - The timestamp of the request.
   * @returns The MapRequest instance for chaining.
   */
  public setTimeStamp(timeStamp: string | number): this {
    this.content.TimeStamp = timeStamp;
    return this;
  }

  /**
   * Sets the Logistics Sub Type.
   *
   * @param subType - The logistics sub type (e.g., UNIMART, FAMI).
   * @returns The MapRequest instance for chaining.
   */
  public setLogisticsSubType(subType: string): this {
    this.content.LogisticsSubType = subType;
    return this;
  }

  /**
   * Sets whether to enable collection.
   *
   * @param isCollection - "Y" for collection, "N" for no collection.
   * @returns The MapRequest instance for chaining.
   */
  public setIsCollection(isCollection: "Y" | "N"): this {
    this.content.IsCollection = isCollection;
    return this;
  }

  /**
   * Sets the Server Reply URL.
   *
   * @param url - The URL for server-side notification.
   * @returns The MapRequest instance for chaining.
   */
  public setServerReplyURL(url: string): this {
    this.content.ServerReplyURL = url;
    return this;
  }

  /**
   * Sets Extra Data.
   *
   * @param data - Extra data to pass through.
   * @returns The MapRequest instance for chaining.
   */
  public setExtraData(data: string): this {
    this.content.ExtraData = data;
    return this;
  }
}
