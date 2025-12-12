import { beforeEach, describe, expect, it, mock, spyOn } from "bun:test";
import { NewebPayLogistics } from "../src/client.js";
import { Environment } from "../src/constants.js";
import { ApiError, NetworkError, NewebPayError } from "../src/errors.js";
import { CreateOrderRequest } from "../src/requests/create-order.request.js";
import { MapRequest } from "../src/requests/map.request.js";
import { PrintOrderRequest } from "../src/requests/print-order.request.js";
import { QueryOrderRequest } from "../src/requests/query-order.request.js";
import { BaseResponse } from "../src/responses/base.response.js";
import { CreateOrderResponse } from "../src/responses/create-order.response.js";
import { PrintOrderResponse } from "../src/responses/print-order.response.js";
import { QueryOrderResponse } from "../src/responses/query-order.response.js";

describe("NewebPayLogistics", () => {
    const merchantId = "MERCHANT_ID";
    const hashKey = "TEST_HASH_KEY_123456789012345678";
    const hashIV = "TEST_HASH_IV_123";

    it("should create MapRequest", () => {
        const client = new NewebPayLogistics(merchantId, hashKey, hashIV);
        const request = client.map();
        expect(request).toBeInstanceOf(MapRequest);
    });

    it("should create CreateOrderRequest", () => {
        const client = new NewebPayLogistics(merchantId, hashKey, hashIV);
        const request = client.createOrder();
        expect(request).toBeInstanceOf(CreateOrderRequest);
    });

    it("should create QueryOrderRequest", () => {
        const client = new NewebPayLogistics(merchantId, hashKey, hashIV);
        const request = client.queryOrder();
        expect(request).toBeInstanceOf(QueryOrderRequest);
    });

    it("should create PrintOrderRequest", () => {
        const client = new NewebPayLogistics(merchantId, hashKey, hashIV);
        const request = client.printOrder();
        expect(request).toBeInstanceOf(PrintOrderRequest);
    });

    it("should use test environment by default", () => {
        const client = new NewebPayLogistics(merchantId, hashKey, hashIV);
        const request = client.map();
        const url = request.getUrl();
        expect(url).toContain("ccore.newebpay.com"); // 測試環境
    });

    it("should use production environment when specified", () => {
        const client = new NewebPayLogistics(
            merchantId,
            hashKey,
            hashIV,
            undefined,
            Environment.PRODUCTION
        );
        const request = client.map();
        const url = request.getUrl();
        expect(url).toContain("core.newebpay.com"); // 正式環境
    });

    describe("send", () => {
        const mockHttpClient = {
            post: mock(() => Promise.resolve({ ok: true, status: 200, text: async () => "" })),
        };

        beforeEach(() => {
            mockHttpClient.post.mockClear();
        });

        it("should send request and return BaseResponse", async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () => JSON.stringify({ Status: "SUCCESS", Message: "Test" }),
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );

            const request = clientWithMock.map();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            const response = await clientWithMock.send(request);
            expect(response).toBeInstanceOf(BaseResponse);
            expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
        });

        it("should return CreateOrderResponse for CreateOrderRequest", async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () =>
                    JSON.stringify({
                        Status: "SUCCESS",
                        Message: "Order created",
                        Result: { TradeNo: "TRADE123" },
                    }),
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );

            const request = clientWithMock.createOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            const response = await clientWithMock.send(request);
            expect(response).toBeInstanceOf(CreateOrderResponse);
        });

        it("should return QueryOrderResponse for QueryOrderRequest", async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () =>
                    JSON.stringify({
                        Status: "SUCCESS",
                        Message: "Query successful",
                        Result: { LogisticsStatus: "SHIPPED" },
                    }),
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );

            const request = clientWithMock.queryOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            const response = await clientWithMock.send(request);
            expect(response).toBeInstanceOf(QueryOrderResponse);
        });

        it("should return PrintOrderResponse for PrintOrderRequest with HTML", async () => {
            const htmlContent = "<html><body>Print content</body></html>";
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () => htmlContent,
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );

            const request = clientWithMock.printOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            const response = await clientWithMock.send(request);
            expect(response).toBeInstanceOf(PrintOrderResponse);
            expect((response as PrintOrderResponse).getHtmlContent()).toBe(htmlContent);
        });

        it("should throw NetworkError on fetch failure", async () => {
            mockHttpClient.post.mockRejectedValue(new Error("Network failure"));

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );
            const request = clientWithMock.createOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            await expect(clientWithMock.send(request)).rejects.toThrow(NetworkError);
        });

        it("should throw NetworkError when response.text() fails", async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () => {
                    throw new Error("Failed to read text");
                },
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );
            const request = clientWithMock.createOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            await expect(clientWithMock.send(request)).rejects.toThrow(NetworkError);
        });

        it("should throw ApiError on non-ok response", async () => {
            mockHttpClient.post.mockResolvedValue({
                ok: false,
                status: 500,
                text: async () => "Internal Server Error",
            });

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );
            const request = clientWithMock.createOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            await expect(clientWithMock.send(request)).rejects.toThrow(ApiError);
        });

        it("should throw ApiError when JSON parsing fails for non-PrintOrder request", async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () => "Invalid JSON response",
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );
            const request = clientWithMock.createOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            await expect(clientWithMock.send(request)).rejects.toThrow(ApiError);
        });

        it("should handle parseError that is not an Error instance", async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () => "Invalid JSON response",
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );
            const request = clientWithMock.createOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST",
                HashData_: "TEST",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            try {
                await clientWithMock.send(request);
                expect.fail("應該拋出 ApiError");
            } catch (error) {
                expect(error).toBeInstanceOf(ApiError);
                // 驗證錯誤訊息包含 parseError 的訊息
                expect((error as ApiError).message).toContain("無法解析回應為 JSON");
            }
        });

        it("should convert payload to URLSearchParams correctly", async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () => JSON.stringify({ Status: "SUCCESS", Message: "Test" }),
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            const clientWithMock = new NewebPayLogistics(
                merchantId,
                hashKey,
                hashIV,
                mockHttpClient
            );

            const request = clientWithMock.createOrder();
            spyOn(request, "getPayload").mockReturnValue({
                MerchantID_: "TEST",
                PostData_: "TEST_DATA",
                HashData_: "HASH_DATA",
                UID_: "TEST",
                EncryptData_: "TEST",
                Version_: "1.0",
                RespondType_: "JSON",
            });

            await clientWithMock.send(request);

            expect(mockHttpClient.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.any(URLSearchParams)
            );
        });
    });
});
