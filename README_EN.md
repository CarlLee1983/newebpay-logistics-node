# NewebPay Logistics Node.js SDK

A Node.js SDK for integrating with NewebPay Logistics API (藍新金流物流 API).

## Features

- ✅ Full TypeScript support
- ✅ Node.js 18+ support (uses native `fetch` and `node:crypto`)
- ✅ Zod data validation
- ✅ Comprehensive type definitions
- ✅ Test/Production environment switching
- ✅ Robust error handling
- ✅ XSS protection (FormBuilder)
- ✅ Encryption key length validation

## Installation

```bash
npm install @carllee1983/newebpay-logistics
```

## Usage

### Initialization

```typescript
import { NewebPayLogistics, Environment } from '@carllee1983/newebpay-logistics';

// Test environment (default)
const logistics = new NewebPayLogistics(
  'YOUR_MERCHANT_ID',
  'YOUR_HASH_KEY',
  'YOUR_HASH_IV'
);

// Production environment
const logisticsProd = new NewebPayLogistics(
  'YOUR_MERCHANT_ID',
  'YOUR_HASH_KEY',
  'YOUR_HASH_IV',
  undefined, // Optional custom HttpClient
  Environment.PRODUCTION
);
```

### Map Interface (Logistics Selection)

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

// Generate HTML form
const formBuilder = new FormBuilder();
const html = formBuilder.build(map);
console.log(html);
```

### Create Order

```typescript
import { LgsType, ShipType, TradeType } from '@carllee1983/newebpay-logistics';

const create = logistics.createOrder();
create.setMerchantTradeNo('TRADE' + Date.now())
      .setLgsType(LgsType.B2C)
      .setShipType(ShipType.SEVEN_ELEVEN)
      .setTradeType(TradeType.PAYMENT)
      .setAmt(100)
      .setUserName('Test User')
      .setUserEmail('user@example.com')
      .setReceiverName('Receiver')
      .setReceiverEmail('receiver@example.com')
      .setTimeStamp(Math.floor(Date.now() / 1000));

try {
  const response = await logistics.send(create);
  if (response.isSuccess()) {
    console.log('Order created successfully:', response.getData());
  } else {
    console.error('Order creation failed:', response.getMessage());
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  } else if (error instanceof ApiError) {
    console.error('API error:', error.message, error.status);
  }
}
```

### Query Order

```typescript
const query = logistics.queryOrder();
query.setMerchantTradeNo('TRADE123456')
     .setTimeStamp(Math.floor(Date.now() / 1000))
     .setLogisticsID('LOGISTICS_ID'); // Optional

try {
  const response = await logistics.send(query);
  console.log('Order status:', response.getData());
} catch (error) {
  console.error('Query failed:', error);
}
```

### Print Order

```typescript
const print = logistics.printOrder();
print.setMerchantTradeNo('TRADE123456')
     .setTimeStamp(Math.floor(Date.now() / 1000))
     .setLogisticsID('LOGISTICS_ID'); // Optional

try {
  const response = await logistics.send(print);
  if (response instanceof PrintOrderResponse) {
    const html = response.getHtmlContent();
    console.log('Print HTML:', html);
  }
} catch (error) {
  console.error('Print failed:', error);
}
```

## Error Handling

The SDK provides multiple error types for convenient error handling:

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
    // Request validation failed (e.g., missing required fields, format errors, etc.)
    console.error('Validation error:', error.message);
  } else if (error instanceof NetworkError) {
    // Network request failed
    console.error('Network error:', error.message);
    console.error('Original error:', error.originalError);
  } else if (error instanceof ApiError) {
    // API returned an error
    console.error('API error:', error.message);
    console.error('Status code:', error.status);
    console.error('Error data:', error.data);
  } else if (error instanceof NewebPayError) {
    // Other NewebPay-related errors
    console.error('Other error:', error.message);
  }
}
```

## API Reference

### NewebPayLogistics

The main SDK client class.

#### Constructor

```typescript
constructor(
  merchantId: string,
  hashKey: string,
  hashIV: string,
  httpClient?: HttpClient,
  environment?: Environment
)
```

#### Methods

- `map()`: Creates a MapRequest instance
- `createOrder()`: Creates a CreateOrderRequest instance
- `queryOrder()`: Creates a QueryOrderRequest instance
- `printOrder()`: Creates a PrintOrderRequest instance
- `send(request: BaseRequest): Promise<BaseResponse>`: Sends a request

### Constants

#### LgsType (Logistics Type)

- `LgsType.B2C`: Business to Consumer
- `LgsType.C2C`: Consumer to Consumer

#### ShipType (Shipping Type)

- `ShipType.SEVEN_ELEVEN`: 7-Eleven
- `ShipType.FAMILY`: FamilyMart
- `ShipType.HILIFE`: Hi-Life
- `ShipType.OK`: OK Mart

#### TradeType (Trade Type)

- `TradeType.PAYMENT`: Payment required
- `TradeType.NON_PAYMENT`: No payment required

#### Environment

- `Environment.TEST`: Test environment (default)
- `Environment.PRODUCTION`: Production environment

## Development

### Prerequisites

- Node.js 18 or higher

### Setup

```bash
npm install
```

### Testing

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Building

Build the project:

```bash
npm run build
```

### Linting & Formatting

Check for linting errors:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

## Notes

1. **Encryption Key Length**: `hashKey` must be 32 bytes, and `hashIV` must be 16 bytes. The SDK automatically validates the length and throws a `ValidationError` if the requirements are not met.

2. **Environment Switching**: The default is the test environment. For production, explicitly specify `Environment.PRODUCTION`.

3. **Error Handling**: It is recommended to use try-catch and check error types for appropriate error handling.

4. **FormBuilder Security**: FormBuilder automatically escapes HTML attribute values to prevent XSS attacks.

## License

MIT
