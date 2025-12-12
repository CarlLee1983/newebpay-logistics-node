import { z } from "zod";
import { BaseRequest } from "./base.request.js";
import { ValidatorService } from "../services/validator.service.js";
import { EncryptionService } from "../services/encryption.service.js";
import { LgsType, ShipType, Environment } from "../constants.js";

type MapRequestContent = z.infer<typeof ValidatorService.mapRequestSchema>;

/**
 * Map 介面請求（物流選擇）。
 */
export class MapRequest extends BaseRequest<MapRequestContent> {
  protected requestPath = "/map";

  /**
   * 建立 MapRequest 實例。
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
    ValidatorService.validate(ValidatorService.mapRequestSchema, this.content);
  }

  /**
   * 設定物流類型。
   *
   * @param type - 物流類型（例如：B2C, C2C）。
   * @returns MapRequest 實例，支援鏈式呼叫。
   */
  public setLgsType(type: LgsType): this {
    this.content.LgsType = type;
    return this;
  }

  /**
   * 設定配送類型。
   *
   * @param type - 配送類型（例如：7-11, FAMILY）。
   * @returns MapRequest 實例，支援鏈式呼叫。
   */
  public setShipType(type: ShipType): this {
    this.content.ShipType = type;
    return this;
  }

  /**
   * 設定返回 URL。
   *
   * @param url - 選擇地圖後要重定向的 URL。
   * @returns MapRequest 實例，支援鏈式呼叫。
   */
  public setReturnURL(url: string): this {
    this.content.ReturnURL = url;
    return this;
  }

  /**
   * 設定物流子類型。
   *
   * @param subType - 物流子類型（例如：UNIMART, FAMI）。
   * @returns MapRequest 實例，支援鏈式呼叫。
   */
  public setLogisticsSubType(subType: string): this {
    this.content.LogisticsSubType = subType;
    return this;
  }

  /**
   * 設定是否啟用代收。
   *
   * @param isCollection - "Y" 表示代收，"N" 表示不代收。
   * @returns MapRequest 實例，支援鏈式呼叫。
   */
  public setIsCollection(isCollection: "Y" | "N"): this {
    this.content.IsCollection = isCollection;
    return this;
  }

  /**
   * 設定伺服器回覆 URL。
   *
   * @param url - 伺服器端通知的 URL。
   * @returns MapRequest 實例，支援鏈式呼叫。
   */
  public setServerReplyURL(url: string): this {
    this.content.ServerReplyURL = url;
    return this;
  }

  /**
   * 設定額外資料。
   *
   * @param data - 要傳遞的額外資料。
   * @returns MapRequest 實例，支援鏈式呼叫。
   */
  public setExtraData(data: string): this {
    this.content.ExtraData = data;
    return this;
  }
}
