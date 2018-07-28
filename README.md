## Usage

```js
import money from 'decimal.js.macro'

const a = money(1)
const b = money(a)
const c = money(-1)
const d = money(-c)

      ↓ ↓ ↓ ↓ ↓ ↓

import { _Decimal } from 'decimal.js';


const a = _Decimal(1);
const b = _Decimal(a);
const c = _Decimal(-1);
const d = _Decimal(-c);
```
