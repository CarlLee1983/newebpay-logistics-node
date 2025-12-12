import { describe, expect, it } from "bun:test";
import { Environment, LgsType, ShipType, TradeType } from "../src/constants.js";
import { ValidationError } from "../src/errors.js";
import { CreateOrderRequest } from "../src/requests/create-order.request.js";
import { MapRequest } from "../src/requests/map.request.js";
import { PrintOrderRequest } from "../src/requests/print-order.request.js";
import { QueryOrderRequest } from "../src/requests/query-order.request.js";

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

        it("should support all setter methods", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            request
                .setMerchantTradeNo("ORDER123")
                .setLgsType(LgsType.B2C)
                .setShipType(ShipType.SEVEN_ELEVEN)
                .setReturnURL("https://example.com/return")
                .setTimeStamp(1234567890)
                .setLogisticsSubType("UNIMART")
                .setIsCollection("Y")
                .setServerReplyURL("https://example.com/callback")
                .setExtraData("extra data");

            const payload = request.getPayload();
            expect(payload).toHaveProperty("MerchantID_", merchantId);
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

        it("should support all setter methods", () => {
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
                .setTimeStamp(1234567890)
                .setReceiverName("Receiver")
                .setReceiverPhone("0912345678")
                .setReceiverCellPhone("0912345678")
                .setReceiverEmail("receiver@example.com")
                .setLogisticsSubType("UNIMART");

            const payload = request.getPayload();
            expect(payload).toHaveProperty("MerchantID_", merchantId);
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

    describe("Environment configuration", () => {
        it("should use test environment URL by default", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            const url = request.getUrl();
            expect(url).toContain("ccore.newebpay.com");
        });

        it("should use production environment URL when specified", () => {
            const request = new MapRequest(
                merchantId,
                hashKey,
                hashIV,
                undefined,
                Environment.PRODUCTION
            );
            const url = request.getUrl();
            expect(url).toContain("core.newebpay.com");
        });
    });

    describe("BaseRequest common methods", () => {
        it("should have setMerchantTradeNo method in all requests", () => {
            const mapRequest = new MapRequest(merchantId, hashKey, hashIV);
            const createRequest = new CreateOrderRequest(merchantId, hashKey, hashIV);
            const queryRequest = new QueryOrderRequest(merchantId, hashKey, hashIV);
            const printRequest = new PrintOrderRequest(merchantId, hashKey, hashIV);

            expect(typeof mapRequest.setMerchantTradeNo).toBe("function");
            expect(typeof createRequest.setMerchantTradeNo).toBe("function");
            expect(typeof queryRequest.setMerchantTradeNo).toBe("function");
            expect(typeof printRequest.setMerchantTradeNo).toBe("function");
        });

        it("should have setTimeStamp method in all requests", () => {
            const mapRequest = new MapRequest(merchantId, hashKey, hashIV);
            const createRequest = new CreateOrderRequest(merchantId, hashKey, hashIV);
            const queryRequest = new QueryOrderRequest(merchantId, hashKey, hashIV);
            const printRequest = new PrintOrderRequest(merchantId, hashKey, hashIV);

            expect(typeof mapRequest.setTimeStamp).toBe("function");
            expect(typeof createRequest.setTimeStamp).toBe("function");
            expect(typeof queryRequest.setTimeStamp).toBe("function");
            expect(typeof printRequest.setTimeStamp).toBe("function");
        });

        it("should support method chaining", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            const result = request
                .setMerchantTradeNo("ORDER123")
                .setTimeStamp(1234567890)
                .setLgsType(LgsType.B2C);

            expect(result).toBe(request);
        });
    });

    describe("Validation", () => {
        it("should throw ValidationError when required fields are missing", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            // 不設定必填欄位

            expect(() => {
                request.getPayload();
            }).toThrow(ValidationError);
        });

        it("should throw ValidationError for invalid email in CreateOrderRequest", () => {
            const request = new CreateOrderRequest(merchantId, hashKey, hashIV);
            request
                .setMerchantTradeNo("ORDER123")
                .setTradeType(TradeType.PAYMENT)
                .setUserName("Test User")
                .setUserEmail("invalid-email") // 無效的 email
                .setAmt(100)
                .setLgsType(LgsType.B2C)
                .setShipType(ShipType.SEVEN_ELEVEN)
                .setTimeStamp(1234567890);

            expect(() => {
                request.getPayload();
            }).toThrow(ValidationError);
        });
    });
});
