import { BaseResponse } from "./base.response.js";

/**
 * Response data structure for CreateOrder request.
 */
export interface CreateOrderResponseData {
  Status: string;
  Message: string;
  Result?: {
    MerchantID: string;
    MerchantOrderNo: string;
    TradeNo: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Response for CreateOrder request.
 */
export class CreateOrderResponse extends BaseResponse<CreateOrderResponseData> {
  /**
   * Creates a CreateOrderResponse from raw data.
   *
   * @param data - The raw response data.
   * @returns A new CreateOrderResponse instance.
   */
  public static from(data: any): CreateOrderResponse {
    return new CreateOrderResponse(data);
  }
}
