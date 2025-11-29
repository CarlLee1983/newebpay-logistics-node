import { BaseResponse } from "./base.response.js";

/**
 * Response data structure for QueryOrder request.
 */
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

/**
 * Response for QueryOrder request.
 */
export class QueryOrderResponse extends BaseResponse<QueryOrderResponseData> {
  /**
   * Creates a QueryOrderResponse from raw data.
   *
   * @param data - The raw response data.
   * @returns A new QueryOrderResponse instance.
   */
  public static from(data: any): QueryOrderResponse {
    return new QueryOrderResponse(data);
  }
}
