import type { z } from "zod";
import type { Environment, LgsType, ShipType, TradeType } from "../constants.js";
import type { EncryptionService } from "../services/encryption.service.js";
import { ValidatorService } from "../services/validator.service.js";
import { BaseRequest } from "./base.request.js";

type CreateOrderRequestContent = z.infer<typeof ValidatorService.createOrderRequestSchema>;

/**
 * 建立物流訂單的請求。
 */
export class CreateOrderRequest extends BaseRequest<CreateOrderRequestContent> {
    protected requestPath = "/create";

    protected validate(): void {
        ValidatorService.validate(ValidatorService.createOrderRequestSchema, this.content);
    }

    /**
     * 設定交易類型。
     *
     * @param type - 交易類型（例如：PAYMENT, NON_PAYMENT）。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setTradeType(type: TradeType): this {
        this.content.TradeType = type;
        return this;
    }

    /**
     * 設定使用者名稱。
     *
     * @param name - 寄件者姓名。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setUserName(name: string): this {
        this.content.UserName = name;
        return this;
    }

    /**
     * 設定使用者電話。
     *
     * @param tel - 寄件者電話號碼。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setUserTel(tel: string): this {
        this.content.UserTel = tel;
        return this;
    }

    /**
     * 設定使用者電子郵件。
     *
     * @param email - 寄件者電子郵件地址。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setUserEmail(email: string): this {
        this.content.UserEmail = email;
        return this;
    }

    /**
     * 設定門市 ID。
     *
     * @param id - 門市 ID（例如：超商門市 ID）。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setStoreID(id: string): this {
        this.content.StoreID = id;
        return this;
    }

    /**
     * 設定金額。
     *
     * @param amt - 訂單金額。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setAmt(amt: number): this {
        this.content.Amt = amt;
        return this;
    }

    /**
     * 設定物流類型。
     *
     * @param type - 物流類型（例如：B2C, C2C）。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setLgsType(type: LgsType): this {
        this.content.LgsType = type;
        return this;
    }

    /**
     * 設定配送類型。
     *
     * @param type - 配送類型（例如：7-11, FAMILY）。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setShipType(type: ShipType): this {
        this.content.ShipType = type;
        return this;
    }

    /**
     * 設定收件者姓名。
     *
     * @param name - 收件者姓名。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setReceiverName(name: string): this {
        this.content.ReceiverName = name;
        return this;
    }

    /**
     * 設定收件者電話。
     *
     * @param phone - 收件者電話號碼。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setReceiverPhone(phone: string): this {
        this.content.ReceiverPhone = phone;
        return this;
    }

    /**
     * 設定收件者手機。
     *
     * @param cellPhone - 收件者手機號碼。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setReceiverCellPhone(cellPhone: string): this {
        this.content.ReceiverCellPhone = cellPhone;
        return this;
    }

    /**
     * 設定收件者電子郵件。
     *
     * @param email - 收件者電子郵件地址。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setReceiverEmail(email: string): this {
        this.content.ReceiverEmail = email;
        return this;
    }

    /**
     * 設定物流子類型。
     *
     * @param subType - 物流子類型（例如：UNIMART, FAMI）。
     * @returns CreateOrderRequest 實例，支援鏈式呼叫。
     */
    public setLogisticsSubType(subType: string): this {
        this.content.LogisticsSubType = subType;
        return this;
    }
}
