/**
 * Base error class for NewebPay Logistics SDK.
 */
export class NewebPayError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

/**
 * Error thrown when a network request fails.
 */
export class NetworkError extends NewebPayError {
    /**
     * Creates an instance of NetworkError.
     *
     * @param message - The error message.
     * @param originalError - The original error that caused the failure.
     */
    constructor(message: string, public readonly originalError?: unknown) {
        super(message);
    }
}

/**
 * Error thrown when the API returns a non-success status.
 */
export class ApiError extends NewebPayError {
    /**
     * Creates an instance of ApiError.
     *
     * @param message - The error message.
     * @param status - The HTTP status code or API status.
     * @param data - Additional data related to the error.
     */
    constructor(message: string, public readonly status: string, public readonly data?: unknown) {
        super(message);
    }
}

/**
 * Error thrown when request validation fails.
 */
export class ValidationError extends NewebPayError {
    constructor(message: string) {
        super(message);
    }
}
