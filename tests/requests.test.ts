import { describe, it, expect } from "vitest";
import { MapRequest } from "../src/requests/map.request.js";
import { CreateOrderRequest } from "../src/requests/create-order.request.js";
import { QueryOrderRequest } from "../src/requests/query-order.request.js";
import { PrintOrderRequest } from "../src/requests/print-order.request.js";
import { LgsType, ShipType, TradeType } from "../src/constants.js";

describe("Requests", () => {
  const merchantId = "TEST_MERCHANT_ID";
  const hashKey = "TEST_HASH_KEY_123456789012345678";
  const hashIV = "TEST_HASH_IV_123";

  describe("MapRequest", () => {
    it("should generate correct payload", () => {
      const request = new MapRequest(merchantId, hashKey, hashIV);
      request
        .setMerchantTradeNo("ORDER123")
        .setLgsType(LgsType.B2C)
        .setShipType(ShipType.SEVEN_ELEVEN)
        .setReturnURL("https://example.com/return")
        .setTimeStamp(1234567890);

      const payload = request.getPayload();
      expect(payload).toHaveProperty("MerchantID_", merchantId);
      expect(payload).toHaveProperty("PostData_");
      expect(payload).toHaveProperty("HashData_");
    });
  });

  describe("CreateOrderRequest", () => {
    it("should generate correct payload", () => {
      const request = new CreateOrderRequest(merchantId, hashKey, hashIV);
      request
        .setMerchantTradeNo("ORDER123")
        .setTradeType(TradeType.PAYMENT)
        .setUserName("Test User")
        .setUserTel("0912345678")
        .setUserEmail("test@example.com")
        .setStoreID("123456")
        .setAmt(100)
        .setLgsType(LgsType.B2C)
        .setShipType(ShipType.SEVEN_ELEVEN)
        .setTimeStamp(1234567890);

      const payload = request.getPayload();
      expect(payload).toHaveProperty("MerchantID_", merchantId);
      expect(payload).toHaveProperty("PostData_");
      expect(payload).toHaveProperty("HashData_");
    });
  });

  describe("QueryOrderRequest", () => {
    it("should generate correct payload", () => {
      const request = new QueryOrderRequest(merchantId, hashKey, hashIV);
      request
        .setMerchantTradeNo("ORDER123")
        .setLogisticsID("LOG123")
        .setTimeStamp(1234567890);

      const payload = request.getPayload();
      expect(payload).toHaveProperty("MerchantID_", merchantId);
      expect(payload).toHaveProperty("PostData_");
      expect(payload).toHaveProperty("HashData_");
    });
  });

  describe("PrintOrderRequest", () => {
    it("should generate correct payload", () => {
      const request = new PrintOrderRequest(merchantId, hashKey, hashIV);
      request
        .setMerchantTradeNo("ORDER123")
        .setLogisticsID("LOG123")
        .setTimeStamp(1234567890);

      const payload = request.getPayload();
      expect(payload).toHaveProperty("MerchantID_", merchantId);
      expect(payload).toHaveProperty("PostData_");
      expect(payload).toHaveProperty("HashData_");
    });
  });
});
