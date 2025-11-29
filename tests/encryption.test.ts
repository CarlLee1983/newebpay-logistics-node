import { describe, it, expect } from "vitest";
import { EncryptionService } from "../src/services/encryption.service.js";

describe("EncryptionService", () => {
  const service = new EncryptionService();
  const hashKey = "YOUR_HASH_KEY_YOUR_HASH_KEY_KEY_"; // 32 chars
  const hashIV = "YOUR_HASH_IV_IV_"; // 16 chars

  it("should encrypt data correctly", () => {
    const data = { foo: "bar" };
    const encrypted = service.encrypt(data, hashKey, hashIV);
    expect(encrypted).toBeTypeOf("string");
    expect(encrypted.length).toBeGreaterThan(0);
  });

  it("should hash data correctly", () => {
    const encrypted = "ENCRYPTED_DATA";
    const hash = service.hash(encrypted, hashKey, hashIV);
    expect(hash).toBeTypeOf("string");
    expect(hash.length).toBe(64); // SHA256 is 64 hex chars
  });
});
