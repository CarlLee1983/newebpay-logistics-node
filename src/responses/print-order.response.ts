import { BaseResponse } from "./base.response.js";

/**
 * Response data structure for PrintOrder request.
 * Can be a string (HTML) or an object.
 */
export type PrintOrderResponseData = string | { Result?: string;[key: string]: any };

/**
 * Response for PrintOrder request.
 */
export class PrintOrderResponse extends BaseResponse<PrintOrderResponseData> {
  /**
   * Creates a PrintOrderResponse from raw data.
   *
   * @param data - The raw response data.
   * @returns A new PrintOrderResponse instance.
   */
  public static from(data: any): PrintOrderResponse {
    return new PrintOrderResponse(data);
  }

  /**
   * Gets the HTML content for printing.
   *
   * @returns The HTML string.
   */
  public getHtmlContent(): string {
    // PrintOrder usually returns HTML content directly or in a field
    // If the response is HTML string, this.data might be string
    if (typeof this.data === "string") {
      return this.data;
    }
    return this.data.Result || "";
  }
}
