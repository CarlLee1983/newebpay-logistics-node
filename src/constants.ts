/**
 * Logistics Type (LgsType).
 */
export enum LgsType {
  /** B2C (Business to Consumer) */
  B2C = "B2C",
  /** C2C (Consumer to Consumer) */
  C2C = "C2C",
}

/**
 * Shipping Type (ShipType).
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
 * Trade Type (TradeType).
 */
export enum TradeType {
  /** Payment required */
  PAYMENT = "1",
  /** No payment required */
  NON_PAYMENT = "3",
}

/**
 * Response Type (RespondType).
 */
export enum RespondType {
  /** JSON format */
  JSON = "JSON",
  /** HTML format */
  HTML = "HTML",
  /** String format */
  STRING = "String",
}

/**
 * API Version.
 */
export enum Version {
  /** Version 1.0 */
  V_1_0 = "1.0",
}
