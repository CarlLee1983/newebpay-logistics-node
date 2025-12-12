import { describe, expect, it } from "bun:test";
import { ApiError, NetworkError, NewebPayError, ValidationError } from "../src/errors.js";

describe("Custom Errors", () => {
    it("should inherit from Error", () => {
        const error = new NewebPayError("test");
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe("NewebPayError");
    });

    it("NetworkError should store original error", () => {
        const original = new Error("connection failed");
        const error = new NetworkError("network error", original);
        expect(error).toBeInstanceOf(NewebPayError);
        expect(error.originalError).toBe(original);
    });

    it("ApiError should store status and data", () => {
        const error = new ApiError("api error", "404", { detail: "not found" });
        expect(error).toBeInstanceOf(NewebPayError);
        expect(error.status).toBe("404");
        expect(error.data).toEqual({ detail: "not found" });
    });

    it("ValidationError should be a NewebPayError", () => {
        const error = new ValidationError("invalid input");
        expect(error).toBeInstanceOf(NewebPayError);
    });
});
