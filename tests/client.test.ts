import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NewebPayError, NetworkError, ApiError } from "../src/errors.js";
import { NewebPayLogistics } from "../src/client.js";
import { MapRequest } from "../src/requests/map.request.js";
import { CreateOrderRequest } from "../src/requests/create-order.request.js";
import { QueryOrderRequest } from "../src/requests/query-order.request.js";
import { PrintOrderRequest } from "../src/requests/print-order.request.js";
import { BaseResponse } from "../src/responses/base.response.js";

describe("NewebPayLogistics", () => {
    const client = new NewebPayLogistics("MERCHANT_ID", "HASH_KEY", "HASH_IV");

    it("should create MapRequest", () => {
        const request = client.map();
        expect(request).toBeInstanceOf(MapRequest);
    });

    it("should create CreateOrderRequest", () => {
        const request = client.createOrder();
        expect(request).toBeInstanceOf(CreateOrderRequest);
    });

    it("should create QueryOrderRequest", () => {
        const request = client.queryOrder();
        expect(request).toBeInstanceOf(QueryOrderRequest);
    });

    it("should create PrintOrderRequest", () => {
        const request = client.printOrder();
        expect(request).toBeInstanceOf(PrintOrderRequest);
    });

    describe('send', () => {
        const mockHttpClient = {
            post: vi.fn()
        };

        beforeEach(() => {
            mockHttpClient.post.mockClear();
        });

        it('should send request and return response', async () => {
            const mockResponse = {
                ok: true,
                status: 200,
                text: async () => JSON.stringify({ Status: 'SUCCESS', Message: 'Test' }),
            };
            mockHttpClient.post.mockResolvedValue(mockResponse);

            // Inject mockHttpClient into client
            const clientWithMock = new NewebPayLogistics('MERCHANT_ID', 'HASH_KEY', 'HASH_IV', mockHttpClient);

            const request = clientWithMock.createOrder();
            // Mock getPayload to avoid validation errors during test
            vi.spyOn(request, 'getPayload').mockReturnValue({
                MerchantID_: 'TEST',
                PostData_: 'TEST',
                HashData_: 'TEST',
                UID_: 'TEST',
                EncryptData_: 'TEST',
                Version_: '1.0',
                RespondType_: 'JSON'
            });

            const response = await clientWithMock.send(request);
            expect(response).toBeInstanceOf(BaseResponse);
            expect(mockHttpClient.post).toHaveBeenCalledTimes(1);
        });

        it('should throw NetworkError on fetch failure', async () => {
            mockHttpClient.post.mockRejectedValue(new Error('Network failure'));

            const clientWithMock = new NewebPayLogistics('MERCHANT_ID', 'HASH_KEY', 'HASH_IV', mockHttpClient);
            const request = clientWithMock.createOrder();
            vi.spyOn(request, 'getPayload').mockReturnValue({} as any);

            await expect(clientWithMock.send(request)).rejects.toThrow(NetworkError);
        });

        it('should throw ApiError on non-ok response', async () => {
            mockHttpClient.post.mockResolvedValue({
                ok: false,
                status: 500,
                text: async () => 'Internal Server Error'
            });

            const clientWithMock = new NewebPayLogistics('MERCHANT_ID', 'HASH_KEY', 'HASH_IV', mockHttpClient);
            const request = clientWithMock.createOrder();
            vi.spyOn(request, 'getPayload').mockReturnValue({} as any);

            await expect(clientWithMock.send(request)).rejects.toThrow(ApiError);
        });
    });
});
