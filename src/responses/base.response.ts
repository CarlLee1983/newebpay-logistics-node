export class BaseResponse<T = any> {
  protected data: T;

  constructor(data: T) {
    this.data = data;
  }

  public getData(): T {
    return this.data;
  }

  public isSuccess(): boolean {
    return (this.data as any).Status === "SUCCESS";
  }

  public getMessage(): string {
    return (this.data as any).Message || "";
  }
}
