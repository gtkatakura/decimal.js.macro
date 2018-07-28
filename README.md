## Usage

```js
import money from 'decimal.js.macro'

const a = money(1)
const b = money(a - 3 * 4 / 5)
const c = money(a - 3 + 4 - 5)
const d = money(1 ** 2 ** 3)

      ↓ ↓ ↓ ↓ ↓ ↓

const a = money(1);
const b = money(a).sub(money(money('3').mul('4')).div('5'));
const c = money(money(money(a).sub('3')).add('4')).sub('5');
const d = money('1').pow(money('2').pow('3'));
```
