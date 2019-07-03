@1lib/javascript
================

** :no-good: This project is UNDER CONSTRUCTION :writing_hand: **

### Install

```
$ npm install @1lib/javascript --save
```

### Usage

```
import * as lib from '@1lib/javascript';

const add = lib.accumulate('+');
const add2 = add(2);
const add6 = add2(4);
add6(1).$done(); // => 7

const addThreeNumber = add.$config({ param: { count: 4 } }); // receive 3 numbers and 1 operator
addThreeNumber(1)(2)(3); // => 6   ** already currify **

// you can also use the built-in placeholder, like this:
import { _ } from '@1lib/javascript';
lib.accumulate('*')(_, _, 3)(1)(2).$done(); // 1 * 2 * 3

```

Using object-parameters:

```
import { accumulate } from '@1lib/javascript';

const addTwoNumber = accumulate.$config({ param: { mode: 'PARAM_MODE_OBJECT', count: 3 } })({ type: '+' });

addTwoNumber({ value1: 2, value2: 3 }); // => 5
addTwoNumber({ someKey: 1 }); // => f :: { [string]: number } -> number

// the advantage of using object-parameters is that
// you don't care about the order in which parameters are passed.
// exp:
const threeNumbersHandle = accumulate.$config({ param: { mode: 'PARAM_MODE_OBJECT', count: 4 } }); // receive 3 numbers and 1 operator
threeNumbersHandle({ number1: 2 })({ type: '*', number2: 3 })({ number3: 5 }); // => 30

```

### Modules

- [ ] functional
- [ ] math
  - [ ] accumulate
- [ ] tool

### Build

```
# first, clone this repository
$ git clone git@github.com:1lib/javascript.git

# then, run npm command
$ npm run build --silent # global

# or build what you like
$ npm run partial-build functional --silent # building functional module only
```


### Licence

GPL3<Plug>
