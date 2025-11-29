# NewebPay Logistics Node.js SDK

A Node.js SDK for integrating with NewebPay Logistics API (藍新金流物流 API).

## Features
- TypeScript support
- Node.js 18+ support (uses native `fetch` and `node:crypto`)
- Zod validation
- Comprehensive type definitions

## Installation

```bash
npm install newebpay-logistics-node
```

## Usage

### Initialization

```typescript
import { NewebPayLogistics } from 'newebpay-logistics-node';

const logistics = new NewebPayLogistics(
  'YOUR_MERCHANT_ID',
  'YOUR_HASH_KEY',
  'YOUR_HASH_IV'
);
```

### Map Interface

```typescript
import { LgsType, ShipType, FormBuilder } from 'newebpay-logistics-node';

const map = logistics.map();
map.setMerchantTradeNo('TRADE' + Date.now())
   .setLgsType(LgsType.B2C)
   .setShipType(ShipType.SEVEN_ELEVEN)
   .setReturnURL('https://example.com/return');

const formBuilder = new FormBuilder();
const html = formBuilder.build(map);
console.log(html);
```

### Create Order

```typescript
import { LgsType, ShipType, TradeType } from 'newebpay-logistics-node';

const create = logistics.createOrder();
create.setMerchantTradeNo('TRADE' + Date.now())
      .setLgsType(LgsType.B2C)
      .setShipType(ShipType.SEVEN_ELEVEN)
      .setTradeType(TradeType.PAYMENT)
      .setAmt(100)
      .setUserName('Test User')
      .setReceiverName('Receiver')
      .setReceiverEmail('test@example.com')
      .setTimeStamp(Math.floor(Date.now() / 1000));

// const response = await logistics.send(create);
// console.log(response.getData());
```

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

## License

MIT
