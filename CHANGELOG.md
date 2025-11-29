# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-29

### Added
- Initial release of NewebPay Logistics SDK.
- Support for Map, CreateOrder, QueryOrder, and PrintOrder requests.
- `HttpClient` interface and `FetchHttpClient` adapter for transport layer.
- Custom error classes: `NewebPayError`, `NetworkError`, `ApiError`, `ValidationError`.
- Generic `BaseResponse<T>` and specific response types.
- TSDoc documentation for public API.

### Changed
- Refactored `Client` to use dependency injection for `HttpClient`.
- Improved type safety with Zod schemas and inferred types.
- Made `FormBuilder` script generation optional.
- Encapsulated internal services in `src/index.ts`.
