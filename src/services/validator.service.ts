import { z } from "zod";
import { LgsType, ShipType, TradeType } from "../constants.js";
import { ValidationError } from "../errors.js";

/**
 * 使用 Zod schemas 驗證請求資料的服務。
 */
export class ValidatorService {
    /**
     * Zod schema for MapRequest.
     */
    public static readonly mapRequestSchema = z.object({
        MerchantOrderNo: z.string().min(1),
        LgsType: z.nativeEnum(LgsType),
        ShipType: z.nativeEnum(ShipType),
        ReturnURL: z.string().url(),
        TimeStamp: z.string().or(z.number()),
        LogisticsSubType: z.string().optional(),
        IsCollection: z.enum(["Y", "N"]).optional(),
        ServerReplyURL: z.string().url().optional(),
        ExtraData: z.string().optional(),
        Device: z.number().optional(),
    });

    /**
     * Zod schema for CreateOrderRequest.
     */
    public static readonly createOrderRequestSchema = z.object({
        MerchantOrderNo: z.string().min(1),
        TradeType: z.nativeEnum(TradeType),
        UserName: z.string().min(1),
        UserTel: z.string().optional(),
        UserEmail: z.string().email(),
        StoreID: z.string().optional(),
        Amt: z.number().int().positive(),
        LgsType: z.nativeEnum(LgsType),
        ShipType: z.nativeEnum(ShipType),
        TimeStamp: z.string().or(z.number()),
        ReceiverName: z.string().optional(),
        ReceiverPhone: z.string().optional(),
        ReceiverCellPhone: z.string().optional(),
        ReceiverEmail: z.string().email().optional(),
        LogisticsSubType: z.string().optional(),
    });

    /**
     * Zod schema for QueryOrderRequest.
     */
    public static readonly queryOrderRequestSchema = z.object({
        MerchantOrderNo: z.string().min(1),
        TimeStamp: z.string().or(z.number()),
        LogisticsID: z.string().optional(),
    });

    /**
     * Zod schema for PrintOrderRequest.
     */
    public static readonly printOrderRequestSchema = z.object({
        MerchantOrderNo: z.string().min(1),
        TimeStamp: z.string().or(z.number()),
        LogisticsID: z.string().optional(),
    });

    /**
     * 使用 Zod schema 驗證資料。
     *
     * @template T - 資料的型別。
     * @param schema - Zod schema。
     * @param data - 要驗證的資料。
     * @returns 驗證後的資料。
     * @throws {ValidationError} 當驗證失敗時。
     */
    public static validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors
                    .map((err) => `${err.path.join(".")}: ${err.message}`)
                    .join("; ");
                throw new ValidationError(`驗證失敗: ${errorMessages}`);
            }
            throw error;
        }
    }
}
