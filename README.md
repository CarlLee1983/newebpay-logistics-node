# NewebPay Logistics Node.js SDK

用於整合藍新金流物流 API 的 Node.js SDK。

## 功能特色

- ✅ TypeScript 完整支援
- ✅ Node.js 18+ 支援（使用原生 `fetch` 和 `node:crypto`）
- ✅ Zod 資料驗證
- ✅ 完整的型別定義
- ✅ 測試/正式環境切換
- ✅ 完善的錯誤處理
- ✅ XSS 防護（FormBuilder）
- ✅ 加密金鑰長度驗證

## 安裝

```bash
npm install @carllee1983/newebpay-logistics
```

## 使用方式

### 初始化

```typescript
import { NewebPayLogistics, Environment } from '@carllee1983/newebpay-logistics';

// 測試環境（預設）
const logistics = new NewebPayLogistics(
  'YOUR_MERCHANT_ID',
  'YOUR_HASH_KEY',
  'YOUR_HASH_IV'
);

// 正式環境
const logisticsProd = new NewebPayLogistics(
  'YOUR_MERCHANT_ID',
  'YOUR_HASH_KEY',
  'YOUR_HASH_IV',
  undefined, // 可選的自訂 HttpClient
  Environment.PRODUCTION
);
```

### Map 介面（物流選擇）

```typescript
import { LgsType, ShipType, FormBuilder } from '@carllee1983/newebpay-logistics';

const map = logistics.map();
map.setMerchantTradeNo('TRADE' + Date.now())
   .setLgsType(LgsType.B2C)
   .setShipType(ShipType.SEVEN_ELEVEN)
   .setReturnURL('https://example.com/return')
   .setTimeStamp(Math.floor(Date.now() / 1000))
   .setIsCollection('Y')
   .setServerReplyURL('https://example.com/callback');

// 產生 HTML 表單
const formBuilder = new FormBuilder();
const html = formBuilder.build(map);
console.log(html);
```

### 建立訂單

```typescript
import { LgsType, ShipType, TradeType } from '@carllee1983/newebpay-logistics';

const create = logistics.createOrder();
create.setMerchantTradeNo('TRADE' + Date.now())
      .setLgsType(LgsType.B2C)
      .setShipType(ShipType.SEVEN_ELEVEN)
      .setTradeType(TradeType.PAYMENT)
      .setAmt(100)
      .setUserName('測試使用者')
      .setUserEmail('user@example.com')
      .setReceiverName('收件者')
      .setReceiverEmail('receiver@example.com')
      .setTimeStamp(Math.floor(Date.now() / 1000));

try {
  const response = await logistics.send(create);
  if (response.isSuccess()) {
    console.log('訂單建立成功:', response.getData());
  } else {
    console.error('訂單建立失敗:', response.getMessage());
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('驗證錯誤:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('網路錯誤:', error.message);
  } else if (error instanceof ApiError) {
    console.error('API 錯誤:', error.message, error.status);
  }
}
```

### 查詢訂單

```typescript
const query = logistics.queryOrder();
query.setMerchantTradeNo('TRADE123456')
     .setTimeStamp(Math.floor(Date.now() / 1000))
     .setLogisticsID('LOGISTICS_ID'); // 可選

try {
  const response = await logistics.send(query);
  console.log('訂單狀態:', response.getData());
} catch (error) {
  console.error('查詢失敗:', error);
}
```

### 列印訂單

```typescript
const print = logistics.printOrder();
print.setMerchantTradeNo('TRADE123456')
     .setTimeStamp(Math.floor(Date.now() / 1000))
     .setLogisticsID('LOGISTICS_ID'); // 可選

try {
  const response = await logistics.send(print);
  if (response instanceof PrintOrderResponse) {
    const html = response.getHtmlContent();
    console.log('列印 HTML:', html);
  }
} catch (error) {
  console.error('列印失敗:', error);
}
```

## 錯誤處理

SDK 提供多種錯誤類型，方便進行錯誤處理：

```typescript
import { 
  NewebPayError, 
  NetworkError, 
  ApiError, 
  ValidationError 
} from '@carllee1983/newebpay-logistics';

try {
  const response = await logistics.send(request);
} catch (error) {
  if (error instanceof ValidationError) {
    // 請求驗證失敗（例如：必填欄位缺失、格式錯誤等）
    console.error('驗證錯誤:', error.message);
  } else if (error instanceof NetworkError) {
    // 網路請求失敗
    console.error('網路錯誤:', error.message);
    console.error('原始錯誤:', error.originalError);
  } else if (error instanceof ApiError) {
    // API 回傳錯誤
    console.error('API 錯誤:', error.message);
    console.error('狀態碼:', error.status);
    console.error('錯誤資料:', error.data);
  } else if (error instanceof NewebPayError) {
    // 其他 NewebPay 相關錯誤
    console.error('其他錯誤:', error.message);
  }
}
```

## API 參考

### NewebPayLogistics

主要的 SDK 客戶端類別。

#### 建構子

```typescript
constructor(
  merchantId: string,
  hashKey: string,
  hashIV: string,
  httpClient?: HttpClient,
  environment?: Environment
)
```

#### 方法

- `map()`: 建立 MapRequest 實例
- `createOrder()`: 建立 CreateOrderRequest 實例
- `queryOrder()`: 建立 QueryOrderRequest 實例
- `printOrder()`: 建立 PrintOrderRequest 實例
- `send(request: BaseRequest): Promise<BaseResponse>`: 發送請求

### 常數

#### LgsType（物流類型）

- `LgsType.B2C`: 企業對消費者
- `LgsType.C2C`: 消費者對消費者

#### ShipType（配送類型）

- `ShipType.SEVEN_ELEVEN`: 7-Eleven
- `ShipType.FAMILY`: FamilyMart
- `ShipType.HILIFE`: Hi-Life
- `ShipType.OK`: OK Mart

#### TradeType（交易類型）

- `TradeType.PAYMENT`: 需要付款
- `TradeType.NON_PAYMENT`: 不需要付款

#### Environment（環境）

- `Environment.TEST`: 測試環境（預設）
- `Environment.PRODUCTION`: 正式環境

## 開發

### 前置需求

- Node.js 18 或更高版本

### 設定

```bash
npm install
```

### 測試

執行單元測試：

```bash
npm test
```

監聽模式執行測試：

```bash
npm run test:watch
```

### 建置

建置專案：

```bash
npm run build
```

### 程式碼檢查與格式化

檢查程式碼錯誤：

```bash
npm run lint
```

格式化程式碼：

```bash
npm run format
```

## 注意事項

1. **加密金鑰長度**：`hashKey` 必須為 32 bytes，`hashIV` 必須為 16 bytes。SDK 會自動驗證長度，不符合時會拋出 `ValidationError`。

2. **環境切換**：預設使用測試環境，正式環境請明確指定 `Environment.PRODUCTION`。

3. **錯誤處理**：建議使用 try-catch 並檢查錯誤類型，以便進行適當的錯誤處理。

4. **FormBuilder 安全性**：FormBuilder 會自動對 HTML 屬性值進行轉義，防止 XSS 攻擊。

## 授權

MIT
