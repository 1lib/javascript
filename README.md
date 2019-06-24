@1lib/javascript
================

** :man-gesturing-no: This project is UNDER CONSTRUCTION :writing_hand: **

### Install

```
$ npm install @1lib/javascript --save
```

### Usage

```
import * as 1lib from '@1lib/javascript';

const add = 1lib.accumulate('+');

const add2 = add(2);
const add6 = add2(4);

add6(1).$done(); // => 7

const addThreeNumber = add.$config({ param: { count: 4 } }); // 3 numbers, 1 operator

addThreeNumber(1)(2)(3); // => 6   ** already currify **

// you can also use the built-in placeholder, for example:
import { _ } from '@1lib/javascript';

1lib.accumulate('*')(_, _, 3)(1)(2).$done(); // 1 * 2 * 3
```

Using object-parameters:

```
import { accumulate } from '@1lib/javascript';

const addTwoNumber = accumulate.$config({ param: { mode: 'PARAM_MODE_OBJECT', count: 3 } })({ type: '+' });

addTwoNumber({ value1: 2, value2: 3 }); // => 5

addTwoNumber({ someKey: 1 }); // => f :: { [string]: number } -> number

```

### Modules

- [ ] Functional
- [ ] Math
  - [ ] accumulate
- [ ] Tool

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
