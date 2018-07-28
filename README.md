## Usage

```js
import money from 'decimal.js.macro'

const a = money(1)
const b = money(a - 3 * 4 / 5)
const c = money(a - 3 + 4 - 5)
const d = money(1 ** 2 ** 3)

      ↓ ↓ ↓ ↓ ↓ ↓

import { _Decimal } from 'decimal.js';


const a = _Decimal('1');
const b = _Decimal(a).sub(_Decimal(_Decimal('3').mul('4')).div('5'));
const c = _Decimal(_Decimal(_Decimal(a).sub('3')).add('4')).sub('5');
const d = _Decimal('1').pow(_Decimal('2').pow('3'));
```
