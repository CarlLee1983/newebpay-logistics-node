import { describe, expect, it } from "bun:test";
import { ValidationError } from "../src/errors.js";
import { EncryptionService } from "../src/services/encryption.service.js";

describe("EncryptionService", () => {
    const service = new EncryptionService();
    // 32 bytes hashKey
    const hashKey = "YOUR_HASH_KEY_YOUR_HASH_KEY_KEY_";
    // 16 bytes hashIV
    const hashIV = "YOUR_HASH_IV_IV_";

    describe("encrypt", () => {
        it("should encrypt data correctly", () => {
            const data = { foo: "bar" };
            const encrypted = service.encrypt(data, hashKey, hashIV);
            expect(encrypted).toBeTypeOf("string");
            expect(encrypted.length).toBeGreaterThan(0);
            // 加密結果應該是大寫
            expect(encrypted).toBe(encrypted.toUpperCase());
        });

        it("should encrypt complex data", () => {
            const data = {
                MerchantOrderNo: "ORDER123",
                Amount: 100,
                UserName: "Test User",
            };
            const encrypted = service.encrypt(data, hashKey, hashIV);
            expect(encrypted).toBeTypeOf("string");
            expect(encrypted.length).toBeGreaterThan(0);
        });

        it("should throw ValidationError for invalid hashKey length", () => {
            const invalidKey = "SHORT_KEY"; // 少於 32 bytes

            expect(() => {
                service.encrypt({ foo: "bar" }, invalidKey, hashIV);
            }).toThrow(ValidationError);
        });

        it("should throw ValidationError for invalid hashIV length", () => {
            const invalidIV = "SHORT_IV"; // 少於 16 bytes

            expect(() => {
                service.encrypt({ foo: "bar" }, hashKey, invalidIV);
            }).toThrow(ValidationError);
        });

        it("should throw ValidationError with descriptive message for hashKey", () => {
            const invalidKey = "SHORT_KEY";

            try {
                service.encrypt({ foo: "bar" }, invalidKey, hashIV);
                expect.fail("應該拋出 ValidationError");
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError);
                expect((error as ValidationError).message).toContain("hashKey");
                expect((error as ValidationError).message).toContain("32 bytes");
            }
        });

        it("should throw ValidationError with descriptive message for hashIV", () => {
            const invalidIV = "SHORT_IV";

            try {
                service.encrypt({ foo: "bar" }, hashKey, invalidIV);
                expect.fail("應該拋出 ValidationError");
            } catch (error) {
                expect(error).toBeInstanceOf(ValidationError);
                expect((error as ValidationError).message).toContain("hashIV");
                expect((error as ValidationError).message).toContain("16 bytes");
            }
        });

        it("should handle empty data object", () => {
            const data = {};
            const encrypted = service.encrypt(data, hashKey, hashIV);
            expect(encrypted).toBeTypeOf("string");
        });

        it("should handle special characters in data", () => {
            const data = {
                name: "Test & User",
                email: "test@example.com",
                message: "Hello <world>",
            };
            const encrypted = service.encrypt(data, hashKey, hashIV);
            expect(encrypted).toBeTypeOf("string");
        });
    });

    describe("hash", () => {
        it("should hash data correctly", () => {
            const encrypted = "ENCRYPTED_DATA";
            const hash = service.hash(encrypted, hashKey, hashIV);
            expect(hash).toBeTypeOf("string");
            expect(hash.length).toBe(64); // SHA256 is 64 hex chars
            // 雜湊結果應該是大寫
            expect(hash).toBe(hash.toUpperCase());
        });

        it("should produce consistent hash for same input", () => {
            const encrypted = "ENCRYPTED_DATA";
            const hash1 = service.hash(encrypted, hashKey, hashIV);
            const hash2 = service.hash(encrypted, hashKey, hashIV);
            expect(hash1).toBe(hash2);
        });

        it("should produce different hash for different input", () => {
            const encrypted1 = "ENCRYPTED_DATA_1";
            const encrypted2 = "ENCRYPTED_DATA_2";
            const hash1 = service.hash(encrypted1, hashKey, hashIV);
            const hash2 = service.hash(encrypted2, hashKey, hashIV);
            expect(hash1).not.toBe(hash2);
        });

        it("should produce different hash for different keys", () => {
            const encrypted = "ENCRYPTED_DATA";
            const hashKey2 = "DIFFERENT_HASH_KEY_DIFFERENT_KEY_";
            const hash1 = service.hash(encrypted, hashKey, hashIV);
            const hash2 = service.hash(encrypted, hashKey2, hashIV);
            expect(hash1).not.toBe(hash2);
        });

        it("should handle empty encrypted data", () => {
            const encrypted = "";
            const hash = service.hash(encrypted, hashKey, hashIV);
            expect(hash).toBeTypeOf("string");
            expect(hash.length).toBe(64);
        });
    });
});
