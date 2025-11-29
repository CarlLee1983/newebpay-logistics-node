import { BaseResponse } from "./base.response.js";

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

export class CreateOrderResponse extends BaseResponse<CreateOrderResponseData> {
  public static from(data: any): CreateOrderResponse {
    return new CreateOrderResponse(data);
  }
}
