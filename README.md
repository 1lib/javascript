@1lib/javascript
================

### Install

```
$ npm install @lib/javascript --save
```

### Usage

```
import { * as 1lib } from '@1lib/javascript';

const add = 1lib.execute('+');

const add2 = add(2);
const add6 = add2(4);

add6(1).done(); // => 7

add.length = 3;
const addThreeNumber = add;

addThreeNumber(1)(2)(3); // => 6   ** already currify **
```

Using object-parameters:

```
import { execute } from '@1lib/javascript';

const addTwoNumber = execute.$set({ paramMode: 'object' }).$paramNumber(2);

addTwoNumber({ value1: 2, value2: 3 }); // => 5

```

### Licence

GPL3<Plug>
