import type { z } from "zod";
import type { Environment } from "../constants.js";
import type { EncryptionService } from "../services/encryption.service.js";
import { ValidatorService } from "../services/validator.service.js";
import { BaseRequest } from "./base.request.js";

type PrintOrderRequestContent = z.infer<typeof ValidatorService.printOrderRequestSchema>;

/**
 * 列印物流訂單的請求。
 */
export class PrintOrderRequest extends BaseRequest<PrintOrderRequestContent> {
    protected requestPath = "/print";

    protected validate(): void {
        ValidatorService.validate(ValidatorService.printOrderRequestSchema, this.content);
    }

    /**
     * 設定物流 ID。
     *
     * @param id - 物流 ID（配送代碼）。
     * @returns PrintOrderRequest 實例，支援鏈式呼叫。
     */
    public setLogisticsID(id: string): this {
        this.content.LogisticsID = id;
        return this;
    }
}
