import type { z } from "zod";
import type { Environment, LgsType, ShipType } from "../constants.js";
import type { EncryptionService } from "../services/encryption.service.js";
import { ValidatorService } from "../services/validator.service.js";
import { BaseRequest } from "./base.request.js";

type MapRequestContent = z.infer<typeof ValidatorService.mapRequestSchema>;

/**
 * Map 介面請求（物流選擇）。
 */
export class MapRequest extends BaseRequest<MapRequestContent> {
    protected requestPath = "/map";

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
