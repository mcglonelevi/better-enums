# Better Enums

## Enums in Pure JS

### Usage

```js
const Enum = require('better-enums');

const letters = Enum('A', 'B', 'C');

console.log(letters.A); // Symbol(A)
```

### Why create another enum package?

There are many enum packages on NPM. A good enum data structure has the following properties imho:

1. It should be immutable.
2. Values in an enum should be guaranteed to be unique in value.
3. Enum types are a set of types -- they have no direct value.
4. Accessing a non-existent enum type should throw an error.

None of the packages I found on NPM do this.

Many enum solutions on NPM do something similar to this:

```js
const colorEnum = {
    "RED": "red",
    "GREEN": "green",
    "BLUE": "blue"
};
```

Some like this solution because it can be serialized.  IMO, there are better ways to (de)serialize enums (more on this later).  Here's why I don't like this solution:

1. It's not immutable.  This will not throw an error:

```js
const colorEnum = {
    "RED": "red",
    "GREEN": "green",
    "BLUE": "blue"
};

colorEnum.TEAL = "teal"; // Extra values can be added to your enum after declaration.
colorEnum.RED = "lolz"; // This is really bad.
```

Better enums will throw an error if you attempt to reassign an enum property as long as strict mode is used.  Example:

```js
"use strict";

const colorEnum = Enum("RED", "GREEN", "BLUE");

colorEnum.TEAL = "teal"; // Throws error
colorEnum.RED = "lolz"; // Throws error
```

In most cases, your transpiler will include `"use strict;"` at the top of the files that it generates, so you will likely not need that in your code.

2. Strings and numbers commonly used in "enums" from other libraries are not unique in value.  For example:

```js
const colorEnum = {
    "RED": "red",
    "GREEN": "green",
    "BLUE": "blue"
};

colorEnum.RED === "red" // true
```

This is an issue for multiple reasons.  The biggest reason problem is that it becomes difficult in large codebases to detect when a string is being passed in place of an enum value.  This can lead to difficulty in finding references where your enum is being used.  Symbols, on the other hand, are guaranteed to be unique in value:

```js
Symbol() === Symbol() // false
```

3. Enums in other languages have no mapping to a value.  The color enum examples above map the enum keys (object keys) to a value (object properties).  This is not a true enum.  With this library, if you need to tie an enum to a value for purposes of serialization, write something like this:

```js
const colorEnum = Enum("RED", "GREEN", "BLUE");
const serializationMap = {
    [colorEnum.RED]: "red",
    [colorEnum.GREEN]: "green",
    [colorEnum.BLUE]: "blue"
};

serializationMap[colorEnum.RED] // "red"
```

Write the reverse if you need to map a string to an enum.

4. If you access a property on an enum that does not exist, you will receive an error.  Many other libraries on NPM will not throw an error for accessing an enum value that does not exist.
