# Changelog

本專案的所有重要變更都會記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
版本號遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)。

## [1.0.1] - 2025-01-XX

### Added
- 新增環境配置支援（`Environment` enum）
- 新增 `API_BASE_URLS` 常數，支援測試/正式環境切換
- 新增 `BaseResponse.getStatus()` 方法
- 新增 `BaseRequest.setMerchantTradeNo()` 和 `setTimeStamp()` 方法（所有 Request 類別共用）

### Changed
- 改善錯誤處理：`response.text()` 現在有完整的錯誤處理
- 改善 JSON 解析錯誤處理：非 PrintOrder 請求在無法解析 JSON 時會拋出 `ApiError`
- 改善型別定義：`BaseResponse` 現在使用 `BaseResponseData` 介面
- 將所有 `any` 型別改為 `unknown` 或明確型別
- 統一所有註解為繁體中文

### Fixed
- 修復加密服務缺少 Key/IV 長度驗證的問題
- 修復驗證錯誤類型不一致（`ZodError` 現在會轉換為 `ValidationError`）
- 修復 FormBuilder 的 XSS 風險（現在會自動轉義 HTML 屬性值）
- 修復所有 Request 類別重複實作 `setMerchantTradeNo()` 和 `setTimeStamp()` 的問題

### Security
- 新增加密金鑰長度驗證（`hashKey` 必須為 32 bytes，`hashIV` 必須為 16 bytes）
- FormBuilder 現在會自動轉義 HTML 屬性值，防止 XSS 攻擊

## [1.0.0] - 2025-11-29

### Added
- 初始發布 NewebPay Logistics SDK
- 支援 Map、CreateOrder、QueryOrder 和 PrintOrder 請求
- `HttpClient` 介面和 `FetchHttpClient` 適配器用於傳輸層
- 自訂錯誤類別：`NewebPayError`、`NetworkError`、`ApiError`、`ValidationError`
- 泛型 `BaseResponse<T>` 和特定回應類型
- TSDoc 文件用於公開 API

### Changed
- 重構 `Client` 以使用依賴注入進行 `HttpClient`
- 使用 Zod schemas 和推斷型別改善型別安全
- 使 `FormBuilder` 腳本生成可選
- 將內部服務封裝在 `src/index.ts` 中
