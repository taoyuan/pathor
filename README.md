# pathor

[![NPM version][npm-image]][npm-url] [![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

> Parse parameters from a path string with template like `/user/:id` or `/user/:id(\d+)`
>
> TypeScript version of [path-to-regex](https://github.com/lastuniverse/path-to-regex)

## Installation

```
npm install pathor --save
```

## Usage

```javascript
const { PathMatcher } = require('pathor');

const matcher = new PathMatcher(path_template, options?);
```

- **path_template** A path template string.
- **options**
  - **case** When `true` the regexp will be case-sensitive. (default: `true`)
  - **separators** The chars list for split patch string. (default: `'/'`)
  - **fromStart** When `true` the regexp will match from the beginning of the string. (default: `true`)
  - **toEnd** When `true` the regexp will match to the end of the string. (default: `true`)

## How it works?

It is important to understand how the key `:key` is interpreted depending on the pattern `:key(.*)` used and quantifiers
`:key*`. The following examples will help you understand the logic for obtaining key values.

#### the quantifier `*` will capture everything that is not a separator `options.separators`

```javascript
let matcher = new PathMatcher(':path*');
// => matcher.regexp:  /^[\/]?((?:[\/]?[^\/]+)*)[\/]?$/

let result = matcher.match('user/id'); // result: { path: [ 'user', 'id' ] }
let result = matcher.match('/user/id'); // result: { path: [ 'user', 'id' ] }
let result = matcher.match('user/id/'); // result: { path: [ 'user', 'id' ] }
let result = matcher.match('/user/id/'); // result: { path: [ 'user', 'id' ] }

let matcher = new PathMatcher('/:path*');
// => matcher.regexp:  /^[\/]?((?:[\/]?[^\/]+)*)[\/]?$/

let result = matcher.match('user/id'); // result: { path: [ 'user', 'id' ] }
let result = matcher.match('/user/id'); // result: { path: [ 'user', 'id' ] }
let result = matcher.match('user/id/'); // result: { path: [ 'user', 'id' ] }
let result = matcher.match('/user/id/'); // result: { path: [ 'user', 'id' ] }
```

#### Pattern `(...)`, in contrast quantifier, allows you to directly determine the valid key pattern. Such pattern `(.*)` will capture everything, including the splitter.

```javascript
let matcher = new PathMatcher(':path(.*)');
// => matcher.regexp:  /^[\/]?(.*?)[\/]?$/

let result = matcher.match('user/id'); // result: { path: 'user/id' }
let result = matcher.match('/user/id'); // result: { path: 'user/id' }
let result = matcher.match('user/id/'); // result: { path: 'user/id' }
let result = matcher.match('/user/id/'); // result: { path: 'user/id' }

let matcher = new PathMatcher('/:path(.*)');
// => matcher.regexp:  /^[\/]?(.*?)[\/]?$/

let result = matcher.match('user/id'); // result: { path: 'user/id' }
let result = matcher.match('/user/id'); // result: { path: 'user/id' }
let result = matcher.match('user/id/'); // result: { path: 'user/id' }
let result = matcher.match('/user/id/'); // result: { path: 'user/id' }
```

## Samples

The following examples clearly demonstrate the use of keys, their pattern quantifiers.

#### Demonstration of processing a key identifier with a specific content `:keyname(\\d+)`

```javascript
let matcher = new PathMatcher('/foo/:bar(\\d+)');
// => matcher.regexp:  /^[\/]?foo\/?(\d+?)[\/]?$/

let result = matcher.match('/foo/123'); // result: { bar: '123' }
let result = matcher.match('/foo/asd'); // result: undefined
let result = matcher.match('/foo/123asd'); // result: undefined
let result = matcher.match('/foo/123/bar'); // result: undefined
```

#### Demonstration of processing a multiple key identifiers `:keyname1 ... :keyname2`

```javascript
let matcher = new PathMatcher('/user/:foo/:bar');
// => matcher.regexp:  /^[\/]?user\/?([^\/]+?)\/?([^\/]+?)[\/]?$/

let result = matcher.match('/user/123/asd'); // result: { foo: '123', bar: 'asd' }
let result = matcher.match('/user/asd/123'); // result: { foo: 'asd', bar: '123' }
```

#### Demonstration of processing a key identifiers with a repeated names `:keyname(\\d+) ... :keyname(\d+)`

```javascript
let matcher = new PathMatcher('/foo/:bar/:bar');
// => matcher.regexp:  /^[\/]?foo\/?([^\/]+?)\/?([^\/]+?)[\/]?$/

let result = matcher.match('/foo/123/asd'); // result: { bar: [ '123', 'asd' ] }
let result = matcher.match('/foo/asd/123'); // result: { bar: [ 'asd', '123' ] }
```

#### Demonstration of processing a key identifier with a quantifier `?`

```javascript
let matcher = new PathMatcher('/foo/:bar?');
// => matcher.regexp:  /^[\/]?foo\/?([^\/]+?)?[\/]?$/

let result = matcher.match('/foo/123'); // result: { bar: '123' }
let result = matcher.match('/foo/'); // result: { bar: undefined }
let result = matcher.match('/foo'); // result: { bar: undefined }
```

#### Demonstration of processing a key identifier with all features

```javascript
const matcher = new PathMatcher(
  '/user/:id/bar/:key(\\d+):post?fak/:key(d+)*:foo+/test/pictures-:multi(\\w+?.png)*/:key?',
);
// => matcher.regexp: /^[\/]?user\/([^\/]+)\/bar\/(\d+)([^\/]+)?fak\/((?:[^\/]*d+)*)((?:[^\/]*[^\/]+)+)\/test\/pictures-((?:[^\/]*\w+?.png)*)\/([^\/]+)?[\/]?$/

let result = matcher.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png,p02.png,p03.png/333');
/* result: { id: '123',
   key: [ '111', '222', '333' ],
   post: 'qwerty',
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

let result = matcher.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png-p02.png-p03.png');
/* result: { id: '123',
   key: [ '111', '222' ],
   post: 'qwerty',
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

let result = matcher.match('/user/123/bar/111fak/222foo/test/pictures-p01.png,p02.png,p03.png');
/* result: { id: '123',
   key: [ '111', '222' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

let result = matcher.match('/user/123/bar/111fak/foo/test/pictures-p01.png;p02.png;p03.png');
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

let result = matcher.match('/user/123/bar/111fak/foo/test/pictures-p01.png p02.png');
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png' ] } */

let result = matcher.match('/user/123/bar/111fak/foo/test/pictures-p01.png');
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png' ] } */

let result = matcher.match('/user/123/bar/111fak/foo/test/pictures-');
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [] } */
```

... documentation in processed

## Participation in development

```
https://github.com/taoyuan/pathor/issues
```

## License

MIT

[![NPM](https://nodei.co/npm/pathor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pathor/)

[npm-image]: https://img.shields.io/npm/v/pathor.svg?style=flat
[npm-url]: https://npmjs.org/package/pathor
[downloads-image]: http://img.shields.io/npm/dm/pathor.svg?style=flat
[downloads-url]: https://npmjs.org/package/pathor
[license-image]: http://img.shields.io/npm/l/pathor.svg?style=flat
[license-url]: LICENSE
