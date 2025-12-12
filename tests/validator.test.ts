import { describe, it, expect } from "vitest";
import { ValidatorService } from "../src/services/validator.service.js";
import { ValidationError } from "../src/errors.js";
import { LgsType, ShipType, TradeType } from "../src/constants.js";

describe("ValidatorService", () => {
  describe("mapRequestSchema", () => {
    it("should validate valid map request data", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        LgsType: LgsType.B2C,
        ShipType: ShipType.SEVEN_ELEVEN,
        ReturnURL: "https://example.com/return",
        TimeStamp: 1234567890,
      };

      const result = ValidatorService.validate(
        ValidatorService.mapRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });

    it("should validate with optional fields", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        LgsType: LgsType.B2C,
        ShipType: ShipType.SEVEN_ELEVEN,
        ReturnURL: "https://example.com/return",
        TimeStamp: "1234567890",
        LogisticsSubType: "UNIMART",
        IsCollection: "Y" as const,
        ServerReplyURL: "https://example.com/callback",
        ExtraData: "extra",
        Device: 1,
      };

      const result = ValidatorService.validate(
        ValidatorService.mapRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });

    it("should throw ValidationError for invalid data", () => {
      const invalidData = {
        MerchantOrderNo: "", // 空字串不符合 min(1)
        LgsType: "INVALID",
        ShipType: ShipType.SEVEN_ELEVEN,
        ReturnURL: "not-a-url",
        TimeStamp: 1234567890,
      };

      expect(() => {
        ValidatorService.validate(
          ValidatorService.mapRequestSchema,
          invalidData
        );
      }).toThrow(ValidationError);
    });

    it("should throw ValidationError for missing required fields", () => {
      const invalidData = {
        MerchantOrderNo: "ORDER123",
        // 缺少 LgsType, ShipType, ReturnURL, TimeStamp
      };

      expect(() => {
        ValidatorService.validate(
          ValidatorService.mapRequestSchema,
          invalidData
        );
      }).toThrow(ValidationError);
    });
  });

  describe("createOrderRequestSchema", () => {
    it("should validate valid create order request data", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        TradeType: TradeType.PAYMENT,
        UserName: "Test User",
        UserEmail: "test@example.com",
        Amt: 100,
        LgsType: LgsType.B2C,
        ShipType: ShipType.SEVEN_ELEVEN,
        TimeStamp: 1234567890,
      };

      const result = ValidatorService.validate(
        ValidatorService.createOrderRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });

    it("should validate with optional fields", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        TradeType: TradeType.PAYMENT,
        UserName: "Test User",
        UserTel: "0912345678",
        UserEmail: "test@example.com",
        StoreID: "123456",
        Amt: 100,
        LgsType: LgsType.B2C,
        ShipType: ShipType.SEVEN_ELEVEN,
        TimeStamp: "1234567890",
        ReceiverName: "Receiver",
        ReceiverPhone: "0912345678",
        ReceiverCellPhone: "0912345678",
        ReceiverEmail: "receiver@example.com",
        LogisticsSubType: "UNIMART",
      };

      const result = ValidatorService.validate(
        ValidatorService.createOrderRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });

    it("should throw ValidationError for invalid email", () => {
      const invalidData = {
        MerchantOrderNo: "ORDER123",
        TradeType: TradeType.PAYMENT,
        UserName: "Test User",
        UserEmail: "invalid-email", // 無效的 email
        Amt: 100,
        LgsType: LgsType.B2C,
        ShipType: ShipType.SEVEN_ELEVEN,
        TimeStamp: 1234567890,
      };

      expect(() => {
        ValidatorService.validate(
          ValidatorService.createOrderRequestSchema,
          invalidData
        );
      }).toThrow(ValidationError);
    });

    it("should throw ValidationError for negative amount", () => {
      const invalidData = {
        MerchantOrderNo: "ORDER123",
        TradeType: TradeType.PAYMENT,
        UserName: "Test User",
        UserEmail: "test@example.com",
        Amt: -100, // 負數不符合 positive()
        LgsType: LgsType.B2C,
        ShipType: ShipType.SEVEN_ELEVEN,
        TimeStamp: 1234567890,
      };

      expect(() => {
        ValidatorService.validate(
          ValidatorService.createOrderRequestSchema,
          invalidData
        );
      }).toThrow(ValidationError);
    });
  });

  describe("queryOrderRequestSchema", () => {
    it("should validate valid query order request data", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        TimeStamp: 1234567890,
      };

      const result = ValidatorService.validate(
        ValidatorService.queryOrderRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });

    it("should validate with optional LogisticsID", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        TimeStamp: "1234567890",
        LogisticsID: "LOG123",
      };

      const result = ValidatorService.validate(
        ValidatorService.queryOrderRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });

    it("should throw ValidationError for empty MerchantOrderNo", () => {
      const invalidData = {
        MerchantOrderNo: "",
        TimeStamp: 1234567890,
      };

      expect(() => {
        ValidatorService.validate(
          ValidatorService.queryOrderRequestSchema,
          invalidData
        );
      }).toThrow(ValidationError);
    });
  });

  describe("printOrderRequestSchema", () => {
    it("should validate valid print order request data", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        TimeStamp: 1234567890,
      };

      const result = ValidatorService.validate(
        ValidatorService.printOrderRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });

    it("should validate with optional LogisticsID", () => {
      const validData = {
        MerchantOrderNo: "ORDER123",
        TimeStamp: "1234567890",
        LogisticsID: "LOG123",
      };

      const result = ValidatorService.validate(
        ValidatorService.printOrderRequestSchema,
        validData
      );

      expect(result).toEqual(validData);
    });
  });

  describe("validate method error handling", () => {
    it("should convert ZodError to ValidationError", () => {
      const invalidData = {
        MerchantOrderNo: "",
      };

      try {
        ValidatorService.validate(
          ValidatorService.mapRequestSchema,
          invalidData
        );
        expect.fail("應該拋出 ValidationError");
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).message).toContain("驗證失敗");
      }
    });

    it("should re-throw non-ZodError errors", () => {
      const schema = {
        parse: () => {
          throw new Error("Custom error");
        },
      } as any;

      expect(() => {
        ValidatorService.validate(schema, {});
      }).toThrow("Custom error");
    });
  });
});

