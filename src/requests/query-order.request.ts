import type { z } from "zod";
import type { Environment } from "../constants.js";
import type { EncryptionService } from "../services/encryption.service.js";
import { ValidatorService } from "../services/validator.service.js";
import { BaseRequest } from "./base.request.js";

type QueryOrderRequestContent = z.infer<typeof ValidatorService.queryOrderRequestSchema>;

/**
 * 查詢物流訂單的請求。
 */
export class QueryOrderRequest extends BaseRequest<QueryOrderRequestContent> {
    protected requestPath = "/query";

    protected validate(): void {
        ValidatorService.validate(ValidatorService.queryOrderRequestSchema, this.content);
    }

    /**
     * 設定物流 ID。
     *
     * @param id - 物流 ID（配送代碼）。
     * @returns QueryOrderRequest 實例，支援鏈式呼叫。
     */
    public setLogisticsID(id: string): this {
        this.content.LogisticsID = id;
        return this;
    }
}
