/**
 * Base class for all NewebPay Logistics responses.
 *
 * @template T - The type of the response data.
 */
export class BaseResponse<T = any> {
  protected data: T;

  /**
   * Creates an instance of BaseResponse.
   *
   * @param data - The raw response data.
   */
  constructor(data: T) {
    this.data = data;
  }

  /**
   * Gets the raw response data.
   *
   * @returns The response data.
   */
  public getData(): T {
    return this.data;
  }

  /**
   * Checks if the request was successful.
   *
   * @returns True if the status is SUCCESS, false otherwise.
   */
  public isSuccess(): boolean {
    return (this.data as any).Status === "SUCCESS";
  }

  /**
   * Gets the response message.
   *
   * @returns The message from the API.
   */
  public getMessage(): string {
    return (this.data as any).Message || "";
  }
}
