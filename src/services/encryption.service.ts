import { createCipheriv, createHash } from "node:crypto";

export class EncryptionService {
  /**
   * Encrypt data using AES-256-CBC.
   *
   * @param data - The data array to encrypt.
   * @param hashKey - The HashKey.
   * @param hashIV - The HashIV.
   * @returns The encrypted string (hex).
   */
  public encrypt(
    data: Record<string, string | number>,
    hashKey: string,
    hashIV: string,
  ): string {
    const queryString = new URLSearchParams(
      data as Record<string, string>,
    ).toString();

    // URL encode is handled by URLSearchParams, but we need to ensure it matches PHP's http_build_query
    // PHP's http_build_query encodes spaces as '+' by default, URLSearchParams encodes as '+'
    // However, we need to check if specific characters need special handling to match PHP implementation exactly if needed.
    // For now, standard URL encoding should suffice.

    const cipher = createCipheriv("aes-256-cbc", hashKey, hashIV);
    // PKCS7 padding is default in Node.js crypto
    let encrypted = cipher.update(queryString, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted.toUpperCase();
  }

  /**
   * Hash data using SHA256.
   *
   * @param encryptedData - The encrypted data string.
   * @param hashKey - The HashKey.
   * @param hashIV - The HashIV.
   * @returns The hashed string (uppercase).
   */
  public hash(encryptedData: string, hashKey: string, hashIV: string): string {
    const rawString = `HashKey=${hashKey}&${encryptedData}&HashIV=${hashIV}`;
    const hash = createHash("sha256").update(rawString).digest("hex");
    return hash.toUpperCase();
  }
}
