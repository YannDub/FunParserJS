# FunParserJS

[![Build Status](https://travis-ci.org/YannDub/FunParserJS.svg?branch=master)](https://travis-ci.org/YannDub/FunParserJS)

A functionnal parser written in Javascript.

```
npm install funparserjs
```

## Usage

### Available parser :

- `anyChar`: parse any character in a string
- `fail`: parser that always failed
- `success(v)`: parser that always success and return v
- `alternate(p1,p2)`: parser that success if one the two parser success, else fail
- `combine(p,f)`: parser that combine a parser and a function that return a parser
- `combines(p, ...f)`: parser that combine recursively with the result of the previous function,
- `charCond(cond)`: parser that success if the character condition is good else fail
- `char`: parse a character
- `string`: parse a string
- `oneOrMore(p)`: parser that try to run parser p one time or more
- `zeroOrMore(p)`: parser that try to run parser p one time or more
- `digit`: parse a digit
- `number`: parse a number and return a list of digit
- `int`: parse an integer

### How to run a parser

```javascript
const parser = require('funparserjs');

parser.runParser(char, 'Test');
// Will return ['T', 'est']

parser.runParser(success('OK'), 'Test');
// Will return ['OK', 'Test']
```

### How to write you own parser

```javascript
const parser = require('funparserjs');

const fooParser = string('foo');
// Will return a parser of string that match foo
const anyCharBis = combine(anyChar, c => success(c));
// Will return a parser that parse anyChar and success with the char (same as anyChar)
const testParser = combine(char('t'),
                            _ => char('e'),
                            _ => char('s'),
                            _ => char('t'),
                            _ => success(true))
// Will return a parser that parse the string "test" and the result is true
```
