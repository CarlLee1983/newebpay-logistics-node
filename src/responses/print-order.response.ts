import { BaseResponse } from "./base.response.js";

export type PrintOrderResponseData = string | { Result?: string;[key: string]: any };

export class PrintOrderResponse extends BaseResponse<PrintOrderResponseData> {
  public static from(data: any): PrintOrderResponse {
    return new PrintOrderResponse(data);
  }

  public getHtmlContent(): string {
    // PrintOrder usually returns HTML content directly or in a field
    // If the response is HTML string, this.data might be string
    if (typeof this.data === "string") {
      return this.data;
    }
    return this.data.Result || "";
  }
}
