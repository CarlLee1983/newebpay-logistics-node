export class NewebPayError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NetworkError extends NewebPayError {
    constructor(message: string, public readonly originalError?: unknown) {
        super(message);
    }
}

export class ApiError extends NewebPayError {
    constructor(message: string, public readonly status: string, public readonly data?: unknown) {
        super(message);
    }
}

export class ValidationError extends NewebPayError {
    constructor(message: string) {
        super(message);
    }
}
