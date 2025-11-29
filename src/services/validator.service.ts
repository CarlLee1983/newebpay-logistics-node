import { z } from "zod";
import { LgsType, ShipType, TradeType } from "../constants.js";

export class ValidatorService {
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

  public static readonly queryOrderRequestSchema = z.object({
    MerchantOrderNo: z.string().min(1),
    TimeStamp: z.string().or(z.number()),
    LogisticsID: z.string().optional(),
  });

  public static readonly printOrderRequestSchema = z.object({
    MerchantOrderNo: z.string().min(1),
    TimeStamp: z.string().or(z.number()),
    LogisticsID: z.string().optional(),
  });

  public static validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
  }
}
