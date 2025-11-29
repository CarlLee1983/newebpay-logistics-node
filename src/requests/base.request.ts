import { EncryptionService } from "../services/encryption.service.js";
import { RespondType, Version } from "../constants.js";

export abstract class BaseRequest<T = Record<string, any>> {
  protected content: T = {} as T;
  protected abstract requestPath: string;
  protected encryptionService: EncryptionService;

  constructor(
    protected merchantId: string,
    protected hashKey: string,
    protected hashIV: string,
    encryptionService?: EncryptionService
  ) {
    this.encryptionService = encryptionService || new EncryptionService();
  }

  protected abstract validate(): void;

  public getPayload(): Record<string, string> {
    this.validate();

    const encryptedData = this.encryptionService.encrypt(
      this.content as unknown as Record<string, string | number>,
      this.hashKey,
      this.hashIV,
    );
    const hashData = this.encryptionService.hash(
      encryptedData,
      this.hashKey,
      this.hashIV,
    );

    return {
      MerchantID_: this.merchantId,
      PostData_: encryptedData,
      UID_: this.merchantId, // NewebPay seems to use UID_ as well in some contexts, mirroring PHP SDK
      EncryptData_: encryptedData,
      HashData_: hashData,
      Version_: Version.V_1_0,
      RespondType_: RespondType.JSON,
    };
  }

  public getUrl(): string {
    // Default to testing environment, can be overridden
    return `https://ccore.newebpay.com/API/Logistic${this.requestPath}`;
  }
}
