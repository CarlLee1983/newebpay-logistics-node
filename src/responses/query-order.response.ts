import { BaseResponse } from "./base.response.js";

export interface QueryOrderResponseData {
  Status: string;
  Message: string;
  Result?: {
    MerchantID: string;
    MerchantOrderNo: string;
    LogisticsStatus: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export class QueryOrderResponse extends BaseResponse<QueryOrderResponseData> {
  public static from(data: any): QueryOrderResponse {
    return new QueryOrderResponse(data);
  }
}
