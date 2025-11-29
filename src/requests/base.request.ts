import { EncryptionService } from "../services/encryption.service.js";
import { RespondType, Version } from "../constants.js";

/**
 * Abstract base class for all NewebPay Logistics requests.
 *
 * @template T - The type of the request content.
 */
export abstract class BaseRequest<T = Record<string, any>> {
  protected content: T = {} as T;
  protected abstract requestPath: string;
  protected encryptionService: EncryptionService;

  /**
   * Creates an instance of BaseRequest.
   *
   * @param merchantId - The Merchant ID provided by NewebPay.
   * @param hashKey - The Hash Key provided by NewebPay.
   * @param hashIV - The Hash IV provided by NewebPay.
   * @param encryptionService - Optional custom EncryptionService.
   */
  constructor(
    protected merchantId: string,
    protected hashKey: string,
    protected hashIV: string,
    encryptionService?: EncryptionService
  ) {
    this.encryptionService = encryptionService || new EncryptionService();
  }

  /**
   * Validates the request content.
   *
   * @throws {ZodError} If validation fails.
   */
  protected abstract validate(): void;

  /**
   * Generates the payload for the request.
   *
   * This method validates the content, encrypts it, and generates the hash.
   *
   * @returns The payload object containing encrypted data and hash.
   */
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

  /**
   * Gets the full URL for the request.
   *
   * @returns The API URL.
   */
  public getUrl(): string {
    // Default to testing environment, can be overridden
    return `https://ccore.newebpay.com/API/Logistic${this.requestPath}`;
  }
}
