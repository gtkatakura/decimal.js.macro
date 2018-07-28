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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/8618687?v=4" width="100px;"/><br /><sub><b>gtkatakura</b></sub>](https://github.com/gtkatakura)<br />[💻](https://github.com/gtkatakura/decimal.js.macro/commits?author=gtkatakura "Code") [🤔](#ideas-gtkatakura "Ideas, Planning, & Feedback") [⚠️](https://github.com/gtkatakura/decimal.js.macro/commits?author=gtkatakura "Tests") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!