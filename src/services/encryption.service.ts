import { createCipheriv, createHash } from "node:crypto";
import { ValidationError } from "../errors.js";

/**
 * 處理 NewebPay 所需的加密與雜湊服務。
 */
export class EncryptionService {
    /**
     * 使用 AES-256-CBC 加密資料。
     *
     * @param data - 要加密的資料物件。
     * @param hashKey - HashKey（必須為 32 bytes）。
     * @param hashIV - HashIV（必須為 16 bytes）。
     * @returns 加密後的字串（hex 格式，大寫）。
     * @throws {ValidationError} 當 hashKey 或 hashIV 長度不符合要求時。
     */
    public encrypt(data: Record<string, string | number>, hashKey: string, hashIV: string): string {
        // 驗證 hashKey 長度（AES-256 需要 32 bytes）
        if (Buffer.from(hashKey, "utf8").length !== 32) {
            throw new ValidationError(
                `hashKey 長度必須為 32 bytes，目前為 ${Buffer.from(hashKey, "utf8").length} bytes`
            );
        }

        // 驗證 hashIV 長度（CBC 模式需要 16 bytes）
        if (Buffer.from(hashIV, "utf8").length !== 16) {
            throw new ValidationError(
                `hashIV 長度必須為 16 bytes，目前為 ${Buffer.from(hashIV, "utf8").length} bytes`
            );
        }

        const queryString = new URLSearchParams(data as Record<string, string>).toString();

        // URL encode 由 URLSearchParams 處理，確保與 PHP 的 http_build_query 相容
        // PHP 的 http_build_query 預設將空格編碼為 '+'，URLSearchParams 也使用 '+'
        // 標準 URL 編碼應該足夠

        const cipher = createCipheriv("aes-256-cbc", hashKey, hashIV);
        // PKCS7 padding 是 Node.js crypto 的預設值
        let encrypted = cipher.update(queryString, "utf8", "hex");
        encrypted += cipher.final("hex");

        return encrypted.toUpperCase();
    }

    /**
     * 使用 SHA256 雜湊資料。
     *
     * @param encryptedData - 加密後的資料字串。
     * @param hashKey - HashKey。
     * @param hashIV - HashIV。
     * @returns 雜湊後的字串（大寫）。
     */
    public hash(encryptedData: string, hashKey: string, hashIV: string): string {
        const rawString = `HashKey=${hashKey}&${encryptedData}&HashIV=${hashIV}`;
        const hash = createHash("sha256").update(rawString).digest("hex");
        return hash.toUpperCase();
    }
}
