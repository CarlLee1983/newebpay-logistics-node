/**
 * 物流類型（LgsType）。
 */
export enum LgsType {
  /** B2C（企業對消費者） */
  B2C = "B2C",
  /** C2C（消費者對消費者） */
  C2C = "C2C",
}

/**
 * 配送類型（ShipType）。
 */
export enum ShipType {
  /** 7-Eleven */
  SEVEN_ELEVEN = "7-11",
  /** FamilyMart */
  FAMILY = "FAMIC2C",
  /** Hi-Life */
  HILIFE = "HILIFEC2C",
  /** OK Mart */
  OK = "OKMARTC2C",
}

/**
 * 交易類型（TradeType）。
 */
export enum TradeType {
  /** 需要付款 */
  PAYMENT = "1",
  /** 不需要付款 */
  NON_PAYMENT = "3",
}

/**
 * 回應類型（RespondType）。
 */
export enum RespondType {
  /** JSON 格式 */
  JSON = "JSON",
  /** HTML 格式 */
  HTML = "HTML",
  /** 字串格式 */
  STRING = "String",
}

/**
 * API 版本。
 */
export enum Version {
  /** 版本 1.0 */
  V_1_0 = "1.0",
}

/**
 * API 環境類型。
 */
export enum Environment {
  /** 測試環境 */
  TEST = "test",
  /** 正式環境 */
  PRODUCTION = "production",
}

/**
 * API 基礎 URL 對應。
 */
export const API_BASE_URLS: Record<Environment, string> = {
  [Environment.TEST]: "https://ccore.newebpay.com/API/Logistic",
  [Environment.PRODUCTION]: "https://core.newebpay.com/API/Logistic",
};
