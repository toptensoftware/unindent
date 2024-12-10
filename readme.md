# unindent

Utility function to unindent an indented text block by removing
the common leading space from all lines.

## Installation

```
npm install --save toptensoftware/unindent
```

## Usage

Call `unindent`, passing the string and an optional
tab size.  Tabs will be expanded for calculating the
common indent width.

Returns a string with common indentation of all lines
removed.

```js
import { uindent } from "@toptensoftware/unindent"

export function unindent(text, tabsize);
```


## Other Functions

There's a couple of other utility function also exported by this
module:

```js
// Counts the leading spaces in a string, expanding tabs
export function count_spaces(str, tabsize);

// Removes spaces from the start of a string, splitting tabs if necessary
export function trim_spaces(str, spaces, tabsize);
```

