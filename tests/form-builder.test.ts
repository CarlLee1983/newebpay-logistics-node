import { describe, expect, it } from "bun:test";
import { LgsType, ShipType } from "../src/constants.js";
import { MapRequest } from "../src/requests/map.request.js";
import { FormBuilder } from "../src/utils/form-builder.js";

describe("FormBuilder", () => {
    const merchantId = "TEST_MERCHANT_ID";
    const hashKey = "TEST_HASH_KEY_123456789012345678";
    const hashIV = "TEST_HASH_IV_123";

    describe("build", () => {
        it("should build HTML form with script by default", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            request
                .setMerchantTradeNo("ORDER123")
                .setLgsType(LgsType.B2C)
                .setShipType(ShipType.SEVEN_ELEVEN)
                .setReturnURL("https://example.com/return")
                .setTimeStamp(1234567890);

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(request);

            expect(html).toContain('<form id="newebpay-form"');
            expect(html).toContain('method="post"');
            expect(html).toContain(
                '<script>document.getElementById("newebpay-form").submit();</script>'
            );
        });

        it("should build HTML form without script when withScript is false", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            request
                .setMerchantTradeNo("ORDER123")
                .setLgsType(LgsType.B2C)
                .setShipType(ShipType.SEVEN_ELEVEN)
                .setReturnURL("https://example.com/return")
                .setTimeStamp(1234567890);

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(request, { withScript: false });

            expect(html).toContain('<form id="newebpay-form"');
            expect(html).not.toContain("<script>");
        });

        it("should escape HTML attributes to prevent XSS", () => {
            // 建立一個 mock request 來測試轉義功能
            const mockRequest = {
                getPayload: () => ({
                    MerchantID_: 'TEST"><script>alert("XSS")</script>',
                    PostData_: 'DATA&<">',
                    HashData_: "HASH",
                }),
                getUrl: () => "https://example.com/api",
            } as any;

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(mockRequest);

            // 應該轉義特殊字元
            expect(html).toContain("&quot;");
            expect(html).toContain("&lt;");
            expect(html).toContain("&gt;");
            expect(html).toContain("&amp;");
            // 不應該包含未轉義的 script 標籤（在屬性值中）
            expect(html).not.toContain('value="<script>alert');
            // 驗證轉義後的內容是安全的
            expect(html).toContain("&lt;script&gt;");
        });

        it("should escape ampersand in values", () => {
            const mockRequest = {
                getPayload: () => ({
                    MerchantID_: "ORDER&123",
                    PostData_: "DATA",
                    HashData_: "HASH",
                }),
                getUrl: () => "https://example.com/api",
            } as any;

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(mockRequest);

            expect(html).toContain("&amp;");
            expect(html).not.toContain('value="ORDER&123"');
        });

        it("should escape quotes in values", () => {
            const mockRequest = {
                getPayload: () => ({
                    MerchantID_: 'ORDER"123',
                    PostData_: "DATA",
                    HashData_: "HASH",
                }),
                getUrl: () => "https://example.com/api",
            } as any;

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(mockRequest);

            expect(html).toContain("&quot;");
            expect(html).not.toContain('value="ORDER"123"');
        });

        it("should escape URL in action attribute", () => {
            const mockRequest = {
                getPayload: () => ({
                    MerchantID_: "TEST",
                    PostData_: "DATA",
                    HashData_: "HASH",
                }),
                getUrl: () => 'https://example.com/api?param="value"',
            } as any;

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(mockRequest);

            expect(html).toContain("&quot;");
            expect(html).toContain('action="');
        });

        it("should include all payload fields as hidden inputs", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            request
                .setMerchantTradeNo("ORDER123")
                .setLgsType(LgsType.B2C)
                .setShipType(ShipType.SEVEN_ELEVEN)
                .setReturnURL("https://example.com/return")
                .setTimeStamp(1234567890);

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(request);

            expect(html).toContain('name="MerchantID_"');
            expect(html).toContain('name="PostData_"');
            expect(html).toContain('name="HashData_"');
        });

        it("should include submit button", () => {
            const request = new MapRequest(merchantId, hashKey, hashIV);
            request
                .setMerchantTradeNo("ORDER123")
                .setLgsType(LgsType.B2C)
                .setShipType(ShipType.SEVEN_ELEVEN)
                .setReturnURL("https://example.com/return")
                .setTimeStamp(1234567890);

            const formBuilder = new FormBuilder();
            const html = formBuilder.build(request);

            expect(html).toContain('<button type="submit">Submit</button>');
        });
    });
});
