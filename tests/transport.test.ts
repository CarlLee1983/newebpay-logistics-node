import { describe, it, expect, vi, beforeEach } from "vitest";
import { FetchHttpClient, HttpClient } from "../src/transport.js";

describe("FetchHttpClient", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
  });

  it("should use custom fetch when provided", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      text: async () => "test response",
    };

    mockFetch.mockResolvedValue(mockResponse);

    const client = new FetchHttpClient(mockFetch);
    const params = new URLSearchParams({ key: "value" });

    await client.post("https://example.com/api", params);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://example.com/api",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "NewebPay-Logistics-Node-SDK",
        }),
        body: params,
      })
    );
  });

  it("should use global fetch when custom fetch not provided", async () => {
    // 在 Node.js 18+ 環境中，fetch 是可用的
    const client = new FetchHttpClient();
    const params = new URLSearchParams({ key: "value" });

    // 由於我們無法輕易 mock 全域 fetch，我們只測試建構子不會拋出錯誤
    expect(client).toBeInstanceOf(FetchHttpClient);

    // 測試當 customFetch 為 undefined 時，會使用全域 fetch
    // 這裡我們無法真正測試 fetch 呼叫，但可以確認建構子接受 undefined
    const clientWithUndefined = new FetchHttpClient(undefined);
    expect(clientWithUndefined).toBeInstanceOf(FetchHttpClient);
  });

  it("should return ResponseData with correct structure", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      text: async () => "test response",
    };

    mockFetch.mockResolvedValue(mockResponse);

    const client = new FetchHttpClient(mockFetch);
    const params = new URLSearchParams({ key: "value" });

    const response = await client.post("https://example.com/api", params);

    expect(response).toHaveProperty("ok", true);
    expect(response).toHaveProperty("status", 200);
    expect(response).toHaveProperty("text");
    expect(typeof response.text).toBe("function");
  });

  it("should handle non-ok responses", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    const client = new FetchHttpClient(mockFetch);
    const params = new URLSearchParams({ key: "value" });

    const response = await client.post("https://example.com/api", params);

    expect(response.ok).toBe(false);
    expect(response.status).toBe(500);
  });

  it("should pass URLSearchParams as body", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      text: async () => "test",
    };

    mockFetch.mockResolvedValue(mockResponse);

    const client = new FetchHttpClient(mockFetch);
    const params = new URLSearchParams();
    params.append("key1", "value1");
    params.append("key2", "value2");

    await client.post("https://example.com/api", params);

    const callArgs = mockFetch.mock.calls[0];
    expect(callArgs[1].body).toBe(params);
  });
});

describe("HttpClient interface", () => {
  it("should be implemented by FetchHttpClient", () => {
    const client = new FetchHttpClient();
    // TypeScript 編譯時會檢查，這裡只是確保實作正確
    expect(client).toBeInstanceOf(FetchHttpClient);
  });
});

