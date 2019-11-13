@1lib/javascript
================

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

:no_good: **THIS PROJECT IS STILL UNDER CONSTRUCTION** :writing_hand:

### Install

```sh
$ npm install @1lib/javascript --save
```

### Usage

```js
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

Using object-parameters mode:

```js
import { accumulate } from '@1lib/javascript';

const addTwoNumber = accumulate.$config({ param: { mode: 'PARAM_MODE_OBJECT', count: 3 } })({ type: '+' });

addTwoNumber({ value1: 2, value2: 3 }); // => 5
addTwoNumber({ someKey: 1 }); // => f :: { [string]: number } -> number

// the advantage of using object-parameters is that
// you don't care about the order in which parameters are passed.
// for example:
const threeNumbersHandle = accumulate.$config({ param: { mode: 'PARAM_MODE_OBJECT', count: 4 } }); // receive 3 numbers and 1 operator
threeNumbersHandle({ number1: 2 })({ type: '*', number2: 3 })({ number3: 5 }); // => 30

```

### Modules

1. core
   
  | name | description | status |
  | :--- | :---------: | :----: |
  | ma   |             |   []   |

2. functional

  | name       | description | status |
  | :--------- | :---------: | :----: |
  | accumulate |             |   []   |

3. reactive
   
  | name | description | status |
  | :--- | :---------: | :----: |
  | map  |             |   []   |

### Build

```sh
# First, clone this repository
$ git clone git@github.com:1lib/javascript.git

# Then, run npm command
$ npm run build --silent # global

# Or build what you like
$ npm run partial-build functional --silent # building functional module only
```

### Develop

```sh
# Initial project dependencies
$ npm run bootstrap
```

### Licence

GPL3<Plug>
