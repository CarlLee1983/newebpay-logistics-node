import { describe, it, expect } from "vitest";
import { BaseResponse } from "../src/responses/base.response.js";
import { CreateOrderResponse } from "../src/responses/create-order.response.js";
import { QueryOrderResponse } from "../src/responses/query-order.response.js";
import { PrintOrderResponse } from "../src/responses/print-order.response.js";

describe("BaseResponse", () => {
  it("should create instance with data", () => {
    const data = { Status: "SUCCESS", Message: "Test" };
    const response = new BaseResponse(data);

    expect(response.getData()).toEqual(data);
  });

  it("should return true for isSuccess when Status is SUCCESS", () => {
    const data = { Status: "SUCCESS", Message: "Test" };
    const response = new BaseResponse(data);

    expect(response.isSuccess()).toBe(true);
  });

  it("should return false for isSuccess when Status is not SUCCESS", () => {
    const data = { Status: "FAILED", Message: "Test" };
    const response = new BaseResponse(data);

    expect(response.isSuccess()).toBe(false);
  });

  it("should return message from data", () => {
    const data = { Status: "SUCCESS", Message: "Test message" };
    const response = new BaseResponse(data);

    expect(response.getMessage()).toBe("Test message");
  });

  it("should return empty string when message is missing", () => {
    const data = { Status: "SUCCESS" };
    const response = new BaseResponse(data);

    expect(response.getMessage()).toBe("");
  });

  it("should return status from data", () => {
    const data = { Status: "SUCCESS", Message: "Test" };
    const response = new BaseResponse(data);

    expect(response.getStatus()).toBe("SUCCESS");
  });

  it("should return undefined when status is missing", () => {
    const data = { Message: "Test" };
    const response = new BaseResponse(data);

    expect(response.getStatus()).toBeUndefined();
  });

  describe("string data type (for HTML responses)", () => {
    it("should handle string data type", () => {
      const htmlString = "<html><body>Test</body></html>";
      const response = new BaseResponse(htmlString);

      expect(response.getData()).toBe(htmlString);
    });

    it("should return true for isSuccess when data is string", () => {
      const htmlString = "<html><body>Test</body></html>";
      const response = new BaseResponse(htmlString);

      expect(response.isSuccess()).toBe(true);
    });

    it("should return empty string for getMessage when data is string", () => {
      const htmlString = "<html><body>Test</body></html>";
      const response = new BaseResponse(htmlString);

      expect(response.getMessage()).toBe("");
    });

    it("should return undefined for getStatus when data is string", () => {
      const htmlString = "<html><body>Test</body></html>";
      const response = new BaseResponse(htmlString);

      expect(response.getStatus()).toBeUndefined();
    });
  });
});

describe("CreateOrderResponse", () => {
  it("should create instance from data", () => {
    const data = {
      Status: "SUCCESS",
      Message: "Order created",
      Result: {
        MerchantID: "TEST",
        MerchantOrderNo: "ORDER123",
        TradeNo: "TRADE123",
      },
    };

    const response = CreateOrderResponse.from(data);

    expect(response).toBeInstanceOf(CreateOrderResponse);
    expect(response.getData()).toEqual(data);
    expect(response.isSuccess()).toBe(true);
  });

  it("should handle failed response", () => {
    const data = {
      Status: "FAILED",
      Message: "Order creation failed",
    };

    const response = CreateOrderResponse.from(data);

    expect(response.isSuccess()).toBe(false);
    expect(response.getMessage()).toBe("Order creation failed");
  });
});

describe("QueryOrderResponse", () => {
  it("should create instance from data", () => {
    const data = {
      Status: "SUCCESS",
      Message: "Query successful",
      Result: {
        MerchantID: "TEST",
        MerchantOrderNo: "ORDER123",
        LogisticsStatus: "SHIPPED",
      },
    };

    const response = QueryOrderResponse.from(data);

    expect(response).toBeInstanceOf(QueryOrderResponse);
    expect(response.getData()).toEqual(data);
    expect(response.isSuccess()).toBe(true);
  });
});

describe("PrintOrderResponse", () => {
  it("should create instance from HTML string", () => {
    const htmlString = "<html><body>Print content</body></html>";

    const response = PrintOrderResponse.from(htmlString);

    expect(response).toBeInstanceOf(PrintOrderResponse);
    expect(response.getHtmlContent()).toBe(htmlString);
  });

  it("should create instance from object with Result field", () => {
    const data = {
      Status: "SUCCESS",
      Result: "<html><body>Print content</body></html>",
    };

    const response = PrintOrderResponse.from(data);

    expect(response).toBeInstanceOf(PrintOrderResponse);
    expect(response.getHtmlContent()).toBe(data.Result);
  });

  it("should return empty string when Result is missing", () => {
    const data = {
      Status: "SUCCESS",
    };

    const response = PrintOrderResponse.from(data);

    expect(response.getHtmlContent()).toBe("");
  });

  it("should handle empty HTML string", () => {
    const htmlString = "";

    const response = PrintOrderResponse.from(htmlString);

    expect(response.getHtmlContent()).toBe("");
  });
});

