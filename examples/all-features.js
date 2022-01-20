const {PathMatcher} = require('..');

const matcher = new PathMatcher(
  '/user/:id/bar/:key(\\d+):post?fak/:key(d+)*:foo+/test/pictures-:multi(\\w+?.png)*/:key?',
);
console.log(matcher.regexp);
// matcher.regexp => /^[\/]?user\/([^\/]+)\/bar\/(\d+)([^\/]+)?fak\/((?:[^\/]*d+)*)((?:[^\/]*[^\/]+)+)\/test\/pictures-((?:[^\/]*\w+?.png)*)\/([^\/]+)?[\/]?$/

let result = matcher.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png,p02.png,p03.png/333');
console.log(result);
/* result: { id: '123',
   key: [ '111', '222', '333' ],
   post: 'qwerty',
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

result = matcher.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png-p02.png-p03.png');
console.log(result);
/* result: { id: '123',
   key: [ '111', '222' ],
   post: 'qwerty',
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

result = matcher.match('/user/123/bar/111fak/222foo/test/pictures-p01.png,p02.png,p03.png');
console.log(result);
/* result: { id: '123',
   key: [ '111', '222' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

result = matcher.match('/user/123/bar/111fak/foo/test/pictures-p01.png;p02.png;p03.png');
console.log(result);
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png', 'p03.png' ] } */

result = matcher.match('/user/123/bar/111fak/foo/test/pictures-p01.png p02.png');
console.log(result);
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png', 'p02.png' ] } */

result = matcher.match('/user/123/bar/111fak/foo/test/pictures-p01.png');
console.log(result);
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [ 'p01.png' ] } */

result = matcher.match('/user/123/bar/111fak/foo/test/pictures-');
console.log(result);
/* result: { id: '123',
   key: [ '111' ],
   post: undefined,
   foo: [ 'foo' ],
   multi: [] } */
