@1lib/javascript
================

### Install

```
$ npm install @1lib/javascript --save
```

### Usage

```
import * as 1lib from '@1lib/javascript';

const add = 1lib.execute('+');

const add2 = add(2);
const add6 = add2(4);

add6(1).done(); // => 7

const addThreeNumber = add.$config({ param: { number: 3 } });

addThreeNumber(1)(2)(3); // => 6   ** already currify **
```

Using object-parameters:

```
import { execute } from '@1lib/javascript';

const addTwoNumber = execute('+').$config({ param: { mode: 'object', number: 2 } });

addTwoNumber({ value1: 2, value2: 3 }); // => 5

addTwoNumber({ someKey: 1 }); // => f :: { [string]: number } -> number

```

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
