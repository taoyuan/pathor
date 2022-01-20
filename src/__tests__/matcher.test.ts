import assert from 'assert';
import {PathMatcher} from '..';

describe('Testing the path conversion module in RegExp', function () {
  describe("01. Testing the template '/:path'", function () {
    const re = new PathMatcher('/:path');
    const reend = new PathMatcher('/:path', {case: false, toEnd: false});
    console.log('01. REGEXP toEnd[true]:', re.regexp);
    console.log('01. REGEXP toEnd[false]:', reend.regexp);

    it("pattern does not match string ''.             result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.            result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });
    it("pattern matches string 'user'.                result: `{path:'user'}`", function () {
      expect(re.match('user')).toEqual({path: 'user'});
      expect(reend.match('user')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user'.               result: `{path:'user'}`", function () {
      expect(re.match('/user')).toEqual({path: 'user'});
      expect(reend.match('/user')).toEqual({path: 'user'});
    });
    it("pattern matches string 'user/'.               result: `{path:'user'}`", function () {
      expect(re.match('user/')).toEqual({path: 'user'});
      expect(reend.match('user/')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/'.              result: `{path:'user'}`", function () {
      expect(re.match('/user/')).toEqual({path: 'user'});
      expect(reend.match('/user/')).toEqual({path: 'user'});
    });
    it("pattern does not match string 'user/12345'.   result: `undefined`", function () {
      assert.equal(re.match('user/12345'), undefined);
      expect(reend.match('/user/12345')).toEqual({path: 'user'});
    });
    it("pattern does not match string '/user/12345'.  result: `undefined`", function () {
      assert.equal(re.match('/user/12345'), undefined);
      expect(reend.match('/user/12345')).toEqual({path: 'user'});
    });
    it("pattern does not match string 'user/12345/'.  result: `undefined`", function () {
      assert.equal(re.match('user/12345/'), undefined);
      expect(reend.match('/user/12345')).toEqual({path: 'user'});
    });
    it("pattern does not match string '/user/12345/'. result: `undefined`", function () {
      assert.equal(re.match('/user/12345/'), undefined);
      expect(reend.match('/user/12345')).toEqual({path: 'user'});
    });
  });

  describe("02. Testing the template '/:path*'", function () {
    const re = new PathMatcher('/:path*');
    const reend = new PathMatcher('/:path*', {case: false, toEnd: false});
    console.log('02. REGEXP toEnd[true]:', re.regexp);
    console.log('02. REGEXP toEnd[false]:', reend.regexp);
    it("pattern matches string ''.             result: `{path:[]}`", function () {
      expect(re.match('')).toEqual({path: []});
      expect(reend.match('')).toEqual({path: []});
    });
    it("pattern matches string '/'.            result: `{path:[]}`", function () {
      expect(re.match('/')).toEqual({path: []});
      expect(reend.match('/')).toEqual({path: []});
    });

    it("pattern matches string 'user'.         result: `{path:['user']}`", function () {
      expect(re.match('user')).toEqual({path: ['user']});
      expect(reend.match('user')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user'.        result: `{path:['user']}`", function () {
      expect(re.match('/user')).toEqual({path: ['user']});
      expect(reend.match('/user')).toEqual({path: ['user']});
    });
    it("pattern matches string 'user/'.        result: `{path:['user']}`", function () {
      expect(re.match('user/')).toEqual({path: ['user']});
      expect(reend.match('user/')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user/'.       result: `{path:['user']}`", function () {
      expect(re.match('/user/')).toEqual({path: ['user']});
      expect(reend.match('/user/')).toEqual({path: ['user']});
    });

    it("pattern matches string 'user/12345'.   result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string 'user/12345/'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345/')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345/'. result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345/')).toEqual({path: ['user', '12345']});
    });
  });

  describe("03. Testing the template '/:path+'", function () {
    const re = new PathMatcher('/:path+');
    const reend = new PathMatcher('/:path+', {case: false, toEnd: false});
    console.log('03. REGEXP toEnd[true]:', re.regexp);
    console.log('03. REGEXP toEnd[false]:', reend.regexp);
    it("pattern does not match string ''.          result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.         result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });
    it("pattern matches string 'user'.         result: `{path:['user']}`", function () {
      expect(re.match('user')).toEqual({path: ['user']});
      expect(reend.match('user')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user'.        result: `{path:['user']}`", function () {
      expect(re.match('/user')).toEqual({path: ['user']});
      expect(reend.match('/user')).toEqual({path: ['user']});
    });
    it("pattern matches string 'user/'.        result: `{path:['user']}`", function () {
      expect(re.match('user/')).toEqual({path: ['user']});
      expect(reend.match('user/')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user/'.       result: `{path:['user'}`", function () {
      expect(re.match('/user/')).toEqual({path: ['user']});
      expect(reend.match('/user/')).toEqual({path: ['user']});
    });
    it("pattern matches string 'user/12345'.   result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string 'user/12345/'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345/')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345/'. result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345/')).toEqual({path: ['user', '12345']});
    });
  });

  describe("04. Testing the template '/:path(.*)'", function () {
    const re = new PathMatcher('/:path(.*)');
    const reend = new PathMatcher('/:path(.*)', {case: false, toEnd: false});
    console.log('04. REGEXP toEnd[true]:', re.regexp);
    console.log('04. REGEXP toEnd[false]:', reend.regexp);
    it("pattern matches string ''.             result: `{path: undefined}`", function () {
      expect(re.match('')).toEqual({path: undefined});
      expect(reend.match('')).toEqual({path: undefined});
    });
    it("pattern matches string '/'.            result: `{path: undefined}`", function () {
      expect(re.match('/')).toEqual({path: undefined});
      expect(reend.match('/')).toEqual({path: undefined});
    });

    it("pattern matches string 'user'.         result: `{path:'user'}`", function () {
      expect(re.match('user')).toEqual({path: 'user'});
      expect(reend.match('user')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user'.        result: `{path:'user'}`", function () {
      expect(re.match('/user')).toEqual({path: 'user'});
      expect(reend.match('/user')).toEqual({path: 'user'});
    });
    it("pattern matches string 'user/'.        result: `{path:'user'}`", function () {
      expect(re.match('user/')).toEqual({path: 'user'});
      expect(reend.match('user/')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/'.       result: `{path:'user'}`", function () {
      expect(re.match('/user/')).toEqual({path: 'user'});
      expect(reend.match('/user/')).toEqual({path: 'user'});
    });

    it("pattern matches string 'user/12345'.   result: `{path:'user/12345'}`", function () {
      expect(re.match('user/12345')).toEqual({path: 'user/12345'});
      expect(reend.match('user/12345')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/12345'.  result: `{path:'user/12345'}`", function () {
      expect(re.match('/user/12345')).toEqual({path: 'user/12345'});
      expect(reend.match('/user/12345')).toEqual({path: 'user'});
    });
    it("pattern matches string 'user/12345/'.  result: `{path:'user/12345'}`", function () {
      expect(re.match('user/12345/')).toEqual({path: 'user/12345'});
      expect(reend.match('user/12345/')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/12345/'. result: `{path:'user/12345'}`", function () {
      expect(re.match('/user/12345/')).toEqual({path: 'user/12345'});
      expect(reend.match('/user/12345/')).toEqual({path: 'user'});
    });
  });

  describe("05. Testing the template ':path'", function () {
    const re = new PathMatcher(':path');
    const reend = new PathMatcher(':path', {case: false, toEnd: false});
    console.log('05. REGEXP toEnd[true]:', re.regexp);
    console.log('05. REGEXP toEnd[false]:', reend.regexp);
    it("pattern does not match string ''.             result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.            result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("pattern matches string 'user'.            result: `{path:'user'}`", function () {
      expect(re.match('user')).toEqual({path: 'user'});
      expect(reend.match('user')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user'.           result: `{path:'user'}`", function () {
      expect(re.match('/user')).toEqual({path: 'user'});
      expect(reend.match('/user')).toEqual({path: 'user'});
    });
    it("pattern matches string 'user/'.           result: `{path:'user'}`", function () {
      expect(re.match('user/')).toEqual({path: 'user'});
      expect(reend.match('user/')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/'.          result: `{path:'user'}`", function () {
      expect(re.match('/user/')).toEqual({path: 'user'});
      expect(reend.match('/user/')).toEqual({path: 'user'});
    });

    it("pattern does not match string 'user/12345'.   result: `undefined`", function () {
      assert.equal(re.match('user/12345'), undefined);
      expect(reend.match('user/12345')).toEqual({path: 'user'});
    });
    it("pattern does not match string '/user/12345'.  result: `undefined`", function () {
      assert.equal(re.match('/user/12345'), undefined);
      expect(reend.match('/user/12345')).toEqual({path: 'user'});
    });
    it("pattern does not match string 'user/12345/'.  result: `undefined`", function () {
      assert.equal(re.match('user/12345/'), undefined);
      expect(reend.match('user/12345/')).toEqual({path: 'user'});
    });
    it("pattern does not match string '/user/12345/'. result: `undefined`", function () {
      assert.equal(re.match('/user/12345/'), undefined);
      expect(reend.match('/user/12345/')).toEqual({path: 'user'});
    });
  });

  describe("06. Testing the template ':path*'", function () {
    const re = new PathMatcher(':path*');
    const reend = new PathMatcher(':path*', {case: false, toEnd: false});
    console.log('06. REGEXP toEnd[true]:', re.regexp);
    console.log('06. REGEXP toEnd[false]:', reend.regexp);
    it("pattern matches string ''.             result: `{path:[]}", function () {
      expect(re.match('')).toEqual({path: []});
      expect(reend.match('')).toEqual({path: []});
    });
    it("pattern matches string '/'.            result: `{path:[]}", function () {
      expect(re.match('/')).toEqual({path: []});
      expect(reend.match('/')).toEqual({path: []});
    });

    it("pattern matches string 'user'.         result: `{path:['user']}`", function () {
      expect(re.match('user')).toEqual({path: ['user']});
      expect(reend.match('user')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user'.        result: `{path:['user']}`", function () {
      expect(re.match('/user')).toEqual({path: ['user']});
      expect(reend.match('/user')).toEqual({path: ['user']});
    });
    it("pattern matches string 'user/'.        result: `{path:['user']}`", function () {
      expect(re.match('user/')).toEqual({path: ['user']});
      expect(reend.match('user/')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user/'.       result: `{path:['user']}`", function () {
      expect(re.match('/user/')).toEqual({path: ['user']});
      expect(reend.match('/user/')).toEqual({path: ['user']});
    });

    it("pattern matches string 'user/12345'.   result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string 'user/12345/'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345/')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345/'. result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345/')).toEqual({path: ['user', '12345']});
    });
  });

  describe("07. Testing the template ':path+'", function () {
    const re = new PathMatcher(':path+');
    const reend = new PathMatcher(':path+', {case: false, toEnd: false});
    console.log('07. REGEXP toEnd[true]:', re.regexp);
    console.log('07. REGEXP toEnd[false]:', reend.regexp);
    it("pattern does not match string ''.          result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.         result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("pattern matches string 'user'.         result: `{path:['user']}`", function () {
      expect(re.match('user')).toEqual({path: ['user']});
      expect(reend.match('user')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user'.        result: `{path:['user']}`", function () {
      expect(re.match('/user')).toEqual({path: ['user']});
      expect(reend.match('/user')).toEqual({path: ['user']});
    });
    it("pattern matches string 'user/'.        result: `{path:['user']}`", function () {
      expect(re.match('user/')).toEqual({path: ['user']});
      expect(reend.match('user/')).toEqual({path: ['user']});
    });
    it("pattern matches string '/user/'.       result: `{path:['user']}`", function () {
      expect(re.match('/user/')).toEqual({path: ['user']});
      expect(reend.match('/user/')).toEqual({path: ['user']});
    });

    it("pattern matches string 'user/12345'.   result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string 'user/12345/'.  result: `{path:['user','12345']}`", function () {
      expect(re.match('user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('user/12345/')).toEqual({path: ['user', '12345']});
    });
    it("pattern matches string '/user/12345/'. result: `{path:['user','12345']}`", function () {
      expect(re.match('/user/12345/')).toEqual({path: ['user', '12345']});
      expect(reend.match('/user/12345/')).toEqual({path: ['user', '12345']});
    });
  });

  describe("08. Testing the template ':path(.*)'", function () {
    const re = new PathMatcher(':path(.*)');
    const reend = new PathMatcher(':path(.*)', {case: false, toEnd: false});
    console.log('08. REGEXP toEnd[true]:', re.regexp);
    console.log('08. REGEXP toEnd[false]:', reend.regexp);
    it("pattern matches string '/'.            result: `{path:undefined}`", function () {
      expect(re.match('/')).toEqual({path: undefined});
      expect(reend.match('/')).toEqual({path: undefined});
    });
    it("pattern matches string ''.             result: `{path:undefined}`", function () {
      expect(re.match('')).toEqual({path: undefined});
      expect(reend.match('')).toEqual({path: undefined});
    });

    it("pattern matches string 'user'.         result: `{path:'user'}`", function () {
      expect(re.match('user')).toEqual({path: 'user'});
      expect(reend.match('user')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user'.        result: `{path:'user'}`", function () {
      expect(re.match('/user')).toEqual({path: 'user'});
      expect(reend.match('/user')).toEqual({path: 'user'});
    });
    it("pattern matches string 'user/'.        result: `{path:'user'}`", function () {
      expect(re.match('user/')).toEqual({path: 'user'});
      expect(reend.match('user/')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/'.       result: `{path:'user'}`", function () {
      expect(re.match('/user/')).toEqual({path: 'user'});
      expect(reend.match('/user/')).toEqual({path: 'user'});
    });

    it("pattern matches string 'user/12345'.   result: `{path:'user/12345'}`", function () {
      expect(re.match('user/12345')).toEqual({path: 'user/12345'});
      expect(reend.match('user/12345')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/12345'.  result: `{path:'user/12345'}`", function () {
      expect(re.match('/user/12345')).toEqual({path: 'user/12345'});
      expect(reend.match('/user/12345')).toEqual({path: 'user'});
    });
    it("pattern matches string 'user/12345/'.  result: `{path:'user/12345'}`", function () {
      expect(re.match('user/12345/')).toEqual({path: 'user/12345'});
      expect(reend.match('user/12345/')).toEqual({path: 'user'});
    });
    it("pattern matches string '/user/12345/'. result: `{path:'user/12345'}`", function () {
      expect(re.match('/user/12345/')).toEqual({path: 'user/12345'});
      expect(reend.match('/user/12345/')).toEqual({path: 'user'});
    });
  });

  describe("09. Testing the template '/foo/:bar'", function () {
    const re = new PathMatcher('/foo/:bar');
    const reend = new PathMatcher('/foo/:bar', {case: false, toEnd: false});
    console.log('09. REGEXP toEnd[true]:', re.regexp);
    console.log('09. REGEXP toEnd[false]:', reend.regexp);
    it("pattern does not match string ''.               result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.              result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("pattern does not match string 'foo'.            result: `undefined`", function () {
      assert.equal(re.match('foo'), undefined);
      assert.equal(reend.match('foo'), undefined);
    });
    it("pattern does not match string '/foo'.           result: `undefined`", function () {
      assert.equal(re.match('/foo'), undefined);
      assert.equal(reend.match('/foo'), undefined);
    });
    it("pattern does not match string 'foo/'.           result: `undefined`", function () {
      assert.equal(re.match('foo/'), undefined);
      assert.equal(reend.match('foo/'), undefined);
    });
    it("pattern does not match string '/foo/'.          result: `undefined`", function () {
      assert.equal(re.match('/foo/'), undefined);
      assert.equal(reend.match('/foo/'), undefined);
    });

    it("pattern matches string 'foo/bar'.           result: `{bar:'bar'}`", function () {
      expect(re.match('foo/bar')).toEqual({bar: 'bar'});
      expect(reend.match('foo/bar')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar'.          result: `{bar:'bar'}`", function () {
      expect(re.match('/foo/bar')).toEqual({bar: 'bar'});
      expect(reend.match('/foo/bar')).toEqual({bar: 'bar'});
    });
    it("pattern matches string 'foo/bar/'.          result: `{bar:'bar'}`", function () {
      expect(re.match('foo/bar/')).toEqual({bar: 'bar'});
      expect(reend.match('foo/bar/')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar/'.         result: `{bar:'bar'}`", function () {
      expect(re.match('/foo/bar/')).toEqual({bar: 'bar'});
      expect(reend.match('/foo/bar/')).toEqual({bar: 'bar'});
    });

    it("pattern does not match string 'foo/bar/baz'.    result: `undefined`", function () {
      assert.equal(re.match('foo/bar/baz'), undefined);
      expect(reend.match('foo/bar/baz')).toEqual({bar: 'bar'});
    });
    it("pattern does not match string '/foo/bar/baz'.   result: `undefined`", function () {
      assert.equal(re.match('/foo/bar/baz'), undefined);
      expect(reend.match('/foo/bar/baz')).toEqual({bar: 'bar'});
    });
    it("pattern does not match string 'foo/bar/baz/'.   result: `undefined`", function () {
      assert.equal(re.match('foo/bar/baz/'), undefined);
      expect(reend.match('foo/bar/baz/')).toEqual({bar: 'bar'});
    });
    it("pattern does not match string '/foo/bar/baz/'.  result: `undefined`", function () {
      assert.equal(re.match('/foo/bar/baz/'), undefined);
      expect(reend.match('/foo/bar/baz/')).toEqual({bar: 'bar'});
    });
  });

  describe("10. Testing the template '/foo/:bar?'", function () {
    const re = new PathMatcher('/foo/:bar?');
    const reend = new PathMatcher('/foo/:bar?', {case: false, toEnd: false});
    console.log('10. REGEXP toEnd[true]:', re.regexp);
    console.log('10. REGEXP toEnd[false]:', reend.regexp);
    it("pattern matches string ''.                   result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern matches string '/'.                  result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("pattern matches string 'foo'.                result: `{ bar: undefined }`", function () {
      expect(re.match('foo')).toEqual({bar: undefined});
      expect(reend.match('foo')).toEqual({bar: undefined});
    });
    it("pattern matches string '/foo'.               result: `{ bar: undefined }`", function () {
      expect(re.match('/foo')).toEqual({bar: undefined});
      expect(reend.match('/foo')).toEqual({bar: undefined});
    });
    it("pattern matches string 'foo/'.               result: `{ bar: undefined }`", function () {
      expect(re.match('foo/')).toEqual({bar: undefined});
      expect(reend.match('foo/')).toEqual({bar: undefined});
    });
    it("pattern matches string '/foo/'.              result: `{ bar: undefined }`", function () {
      expect(re.match('/foo/')).toEqual({bar: undefined});
      expect(reend.match('/foo/')).toEqual({bar: undefined});
    });

    it("pattern matches string 'foo/bar'.            result: `{bar:'bar'}`", function () {
      expect(re.match('foo/bar')).toEqual({bar: 'bar'});
      expect(reend.match('foo/bar')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar'.           result: `{bar:'bar'}`", function () {
      expect(re.match('/foo/bar')).toEqual({bar: 'bar'});
      expect(reend.match('/foo/bar')).toEqual({bar: 'bar'});
    });
    it("pattern matches string 'foo/bar/'.           result: `{bar:'bar'}`", function () {
      expect(re.match('foo/bar/')).toEqual({bar: 'bar'});
      expect(reend.match('foo/bar/')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar/'.          result: `{bar:'bar'}`", function () {
      expect(re.match('/foo/bar/')).toEqual({bar: 'bar'});
      expect(reend.match('/foo/bar/')).toEqual({bar: 'bar'});
    });

    it("pattern does not match string 'foo/bar/baz'.     result: `undefined`", function () {
      assert.equal(re.match('foo/bar/baz'), undefined);
      expect(reend.match('foo/bar/baz')).toEqual({bar: 'bar'});
    });
    it("pattern does not match string '/foo/bar/baz'.    result: `undefined`", function () {
      assert.equal(re.match('/foo/bar/baz'), undefined);
      expect(reend.match('/foo/bar/baz')).toEqual({bar: 'bar'});
    });
    it("pattern does not match string 'foo/bar/baz/'.    result: `undefined`", function () {
      assert.equal(re.match('foo/bar/baz/'), undefined);
      expect(reend.match('foo/bar/baz/')).toEqual({bar: 'bar'});
    });
    it("pattern does not match string '/foo/bar/baz/'.   result: `undefined`", function () {
      assert.equal(re.match('/foo/bar/baz/'), undefined);
      expect(reend.match('/foo/bar/baz/')).toEqual({bar: 'bar'});
    });
  });

  describe("11. Testing the template '/foo/:bar(.*)'", function () {
    const re = new PathMatcher('/foo/:bar(.*)');
    const reend = new PathMatcher('/foo/:bar(.*)', {case: false, toEnd: false});
    console.log('11. REGEXP toEnd[true]:', re.regexp);
    console.log('11. REGEXP toEnd[false]:', reend.regexp);
    it("pattern does not match string ''.             result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.            result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("pattern matches string 'foo'.             result: `{ bar: undefined }`", function () {
      expect(re.match('foo')).toEqual({bar: undefined});
      expect(reend.match('foo')).toEqual({bar: undefined});
    });
    it("pattern matches string '/foo'.            result: `{ bar: undefined }`", function () {
      expect(re.match('/foo')).toEqual({bar: undefined});
      expect(reend.match('/foo')).toEqual({bar: undefined});
    });
    it("pattern matches string 'foo/'.            result: `{ bar: undefined }`", function () {
      expect(re.match('foo/')).toEqual({bar: undefined});
      expect(reend.match('foo/')).toEqual({bar: undefined});
    });
    it("pattern matches string '/foo/'.           result: `{ bar: undefined }`", function () {
      expect(re.match('/foo/')).toEqual({bar: undefined});
      expect(reend.match('/foo/')).toEqual({bar: undefined});
    });

    it("pattern matches string 'foo/bar'.         result: `{bar:'bar'}`", function () {
      expect(re.match('foo/bar')).toEqual({bar: 'bar'});
      expect(reend.match('foo/bar')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar'.        result: `{bar:'bar'}`", function () {
      expect(re.match('/foo/bar')).toEqual({bar: 'bar'});
      expect(reend.match('/foo/bar')).toEqual({bar: 'bar'});
    });
    it("pattern matches string 'foo/bar/'.        result: `{bar:'bar'}`", function () {
      expect(re.match('foo/bar/')).toEqual({bar: 'bar'});
      expect(reend.match('foo/bar/')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar/'.       result: `{bar:'bar'}`", function () {
      expect(re.match('/foo/bar/')).toEqual({bar: 'bar'});
      expect(reend.match('/foo/bar')).toEqual({bar: 'bar'});
    });

    it("pattern matches string 'foo/bar/baz'.     result: `{bar:['bar','baz']}`", function () {
      expect(re.match('foo/bar/baz')).toEqual({bar: 'bar/baz'});
      expect(reend.match('foo/bar/baz')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar/baz'.    result: `{bar:['bar','baz']}`", function () {
      expect(re.match('/foo/bar/baz')).toEqual({bar: 'bar/baz'});
      expect(reend.match('/foo/bar/baz')).toEqual({bar: 'bar'});
    });
    it("pattern matches string 'foo/bar/baz/'.    result: `{bar:['bar','baz']}`", function () {
      expect(re.match('foo/bar/baz/')).toEqual({bar: 'bar/baz'});
      expect(reend.match('foo/bar/baz/')).toEqual({bar: 'bar'});
    });
    it("pattern matches string '/foo/bar/baz/'.   result: `{bar:['bar','baz']}`", function () {
      expect(re.match('/foo/bar/baz/')).toEqual({bar: 'bar/baz'});
      expect(reend.match('/foo/bar/baz/')).toEqual({bar: 'bar'});
    });
  });

  describe("12. Testing the template '/foo/:bar(.*)*'", function () {
    const re = new PathMatcher('/foo/:bar(.*)*');
    const reend = new PathMatcher('/foo/:bar(.*)*', {case: false, toEnd: false});
    console.log('12. REGEXP toEnd[true]:', re.regexp);
    console.log('12. REGEXP toEnd[false]:', reend.regexp);
    it("pattern does not match string ''.             result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.            result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("pattern matches string 'foo'.             result: `{ bar: [] }`", function () {
      expect(re.match('foo')).toEqual({bar: []});
      expect(reend.match('foo')).toEqual({bar: []});
    });
    it("pattern matches string '/foo'.            result: `{ bar: [] }`", function () {
      expect(re.match('/foo')).toEqual({bar: []});
      expect(reend.match('/foo')).toEqual({bar: []});
    });
    it("pattern matches string 'foo/'.            result: `{ bar: [] }`", function () {
      expect(re.match('foo/')).toEqual({bar: []});
      expect(reend.match('foo/')).toEqual({bar: []});
    });
    it("pattern matches string '/foo/'.           result: `{ bar: [] }`", function () {
      expect(re.match('/foo/')).toEqual({bar: []});
      expect(reend.match('/foo/')).toEqual({bar: []});
    });

    it("pattern matches string 'foo/bar'.         result: `{bar:['bar']}`", function () {
      expect(re.match('foo/bar')).toEqual({bar: ['bar']});
      expect(reend.match('foo/bar')).toEqual({bar: ['bar']});
    });
    it("pattern matches string '/foo/bar'.        result: `{bar:['bar']}`", function () {
      expect(re.match('/foo/bar')).toEqual({bar: ['bar']});
      expect(reend.match('/foo/bar')).toEqual({bar: ['bar']});
    });
    it("pattern matches string 'foo/bar/'.        result: `{bar:['bar']}`", function () {
      expect(re.match('foo/bar/')).toEqual({bar: ['bar']});
      expect(reend.match('foo/bar/')).toEqual({bar: ['bar']});
    });
    it("pattern matches string '/foo/bar/'.       result: `{bar:['bar']}`", function () {
      expect(re.match('/foo/bar/')).toEqual({bar: ['bar']});
      expect(reend.match('/foo/bar')).toEqual({bar: ['bar']});
    });

    it("pattern matches string 'foo/bar/baz'.     result: `{bar:['bar/baz']}`", function () {
      expect(re.match('foo/bar/baz')).toEqual({bar: ['bar/baz']});
      expect(reend.match('foo/bar/baz')).toEqual({bar: ['bar/baz']});
    });
    it("pattern matches string '/foo/bar/baz'.    result: `{bar:['bar/baz']}`", function () {
      expect(re.match('/foo/bar/baz')).toEqual({bar: ['bar/baz']});
      expect(reend.match('/foo/bar/baz')).toEqual({bar: ['bar/baz']});
    });
    it("pattern matches string 'foo/bar/baz/'.    result: `{bar:['bar/baz']}`", function () {
      expect(re.match('foo/bar/baz/')).toEqual({bar: ['bar/baz']});
      expect(reend.match('foo/bar/baz/')).toEqual({bar: ['bar/baz']});
    });
    it("pattern matches string '/foo/bar/baz/'.   result: `{bar:['bar/baz']}`", function () {
      expect(re.match('/foo/bar/baz/')).toEqual({bar: ['bar/baz']});
      expect(reend.match('/foo/bar/baz/')).toEqual({bar: ['bar/baz']});
    });
  });

  describe("13. Testing the template '/foo/:bar(.+)+'", function () {
    const re = new PathMatcher('/foo/:bar(.+)+');
    const reend = new PathMatcher('/foo/:bar(.+)+', {case: false, toEnd: false});
    console.log('13. REGEXP toEnd[true]:', re.regexp);
    console.log('13. REGEXP toEnd[false]:', reend.regexp);
    it("pattern does not match string ''.             result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("pattern does not match string '/'.            result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("pattern matches string 'foo'.             result: `undefined`", function () {
      assert.equal(re.match('foo'), undefined);
      assert.equal(reend.match('foo'), undefined);
    });
    it("pattern matches string '/foo'.            result: `undefined`", function () {
      assert.equal(re.match('/foo'), undefined);
      assert.equal(reend.match('/foo'), undefined);
    });
    it("pattern matches string 'foo/'.            result: `undefined`", function () {
      assert.equal(re.match('foo/'), undefined);
      assert.equal(reend.match('foo/'), undefined);
    });
    it("pattern matches string '/foo/'.           result: `undefined`", function () {
      assert.equal(re.match('/foo/'), undefined);
      assert.equal(reend.match('/foo/'), undefined);
    });

    it("pattern matches string 'foo/bar'.         result: `{bar:['bar']}`", function () {
      expect(re.match('foo/bar')).toEqual({bar: ['bar']});
      expect(reend.match('foo/bar')).toEqual({bar: ['bar']});
    });
    it("pattern matches string '/foo/bar'.        result: `{bar:['bar']}`", function () {
      expect(re.match('/foo/bar')).toEqual({bar: ['bar']});
      expect(reend.match('/foo/bar')).toEqual({bar: ['bar']});
    });
    it("pattern matches string 'foo/bar/'.        result: `{bar:['bar']}`", function () {
      expect(re.match('foo/bar/')).toEqual({bar: ['bar']});
      expect(reend.match('foo/bar/')).toEqual({bar: ['bar']});
    });
    it("pattern matches string '/foo/bar/'.       result: `{bar:['bar']}`", function () {
      expect(re.match('/foo/bar/')).toEqual({bar: ['bar']});
      expect(reend.match('/foo/bar/')).toEqual({bar: ['bar']});
    });

    it("pattern matches string 'foo/bar/baz'.     result: `{bar:['bar/baz']}`", function () {
      expect(re.match('foo/bar/baz')).toEqual({bar: ['bar/baz']});
      expect(reend.match('foo/bar/baz')).toEqual({bar: ['bar/baz']});
    });
    it("pattern matches string '/foo/bar/baz'.    result: `{bar:['bar/baz']}`", function () {
      expect(re.match('/foo/bar/baz')).toEqual({bar: ['bar/baz']});
      expect(reend.match('/foo/bar/baz')).toEqual({bar: ['bar/baz']});
    });
    it("pattern matches string 'foo/bar/baz/'.    result: `{bar:['bar/baz']}`", function () {
      expect(re.match('foo/bar/baz/')).toEqual({bar: ['bar/baz']});
      expect(reend.match('foo/bar/baz/')).toEqual({bar: ['bar/baz']});
    });
    it("pattern matches string '/foo/bar/baz/'.   result: `{bar:['bar/baz']}`", function () {
      expect(re.match('/foo/bar/baz/')).toEqual({bar: ['bar/baz']});
      expect(reend.match('/foo/bar/baz/')).toEqual({bar: ['bar/baz']});
    });
  });

  describe("14. Testing the template '/foo/:bar/:baz'", function () {
    const re = new PathMatcher('/foo/:bar/:baz');
    const reend = new PathMatcher('/foo/:bar/:baz', {case: false, toEnd: false});
    console.log('14. REGEXP toEnd[true]:', re.regexp);
    console.log('14. REGEXP toEnd[false]:', reend.regexp);
    it("14.1 pattern does not match string ''.             result: `undefined`", function () {
      assert.equal(re.match(''), undefined);
      assert.equal(reend.match(''), undefined);
    });
    it("14.2 pattern does not match string '/'.            result: `undefined`", function () {
      assert.equal(re.match('/'), undefined);
      assert.equal(reend.match('/'), undefined);
    });

    it("14.3 pattern does not match string 'foo'.             result: `undefined`", function () {
      assert.equal(re.match('foo'), undefined);
      assert.equal(reend.match('foo'), undefined);
    });
    it("14.4 pattern does not match string '/foo'.            result: `undefined`", function () {
      assert.equal(re.match('/foo'), undefined);
      assert.equal(reend.match('/foo'), undefined);
    });
    it("14.5 pattern does not match string 'foo/'.            result: `undefined`", function () {
      assert.equal(re.match('foo/'), undefined);
      assert.equal(reend.match('foo/'), undefined);
    });
    it("14.6 pattern does not match string '/foo/'.           result: `undefined`", function () {
      assert.equal(re.match('/foo/'), undefined);
      assert.equal(reend.match('/foo/'), undefined);
    });

    it("14.7 pattern does not match string 'foo/bar'.             result: `undefined`. " + re.regexp, function () {
      assert.equal(re.match('foo/bar'), undefined);
      assert.equal(reend.match('foo/bar'), undefined);
    });
    it("14.8 pattern matches string '/foo/bar'.            result: `undefined`", function () {
      assert.equal(re.match('/foo/bar'), undefined);
      assert.equal(reend.match('/foo/bar'), undefined);
    });
    it("14.9 pattern matches string 'foo/bar/'.            result: `undefined`", function () {
      assert.equal(re.match('foo/bar/'), undefined);
      assert.equal(reend.match('foo/bar/'), undefined);
    });
    it("14.10 pattern matches string '/foo/bar/'.           result: `undefined`", function () {
      assert.equal(re.match('/foo/bar/'), undefined);
      assert.equal(reend.match('/foo/bar/'), undefined);
    });

    it("14.11 pattern matches string 'foo/bar/baz'.         result: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match('foo/bar/baz')).toEqual({bar: 'bar', baz: 'baz'});
      expect(reend.match('foo/bar/baz')).toEqual({bar: 'bar', baz: 'baz'});
    });
    it("14.12 pattern matches string 'foo/bar/baz'.         result: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match('/foo/bar/baz')).toEqual({bar: 'bar', baz: 'baz'});
      expect(reend.match('/foo/bar/baz')).toEqual({bar: 'bar', baz: 'baz'});
    });
    it("14.13 pattern matches string 'foo/bar/baz'.         result: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match('foo/bar/baz/')).toEqual({bar: 'bar', baz: 'baz'});
      expect(reend.match('foo/bar/baz/')).toEqual({bar: 'bar', baz: 'baz'});
    });
    it("14.14 pattern matches string 'foo/bar/baz'.         result: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match('/foo/bar/baz/')).toEqual({bar: 'bar', baz: 'baz'});
      expect(reend.match('/foo/bar/baz/')).toEqual({bar: 'bar', baz: 'baz'});
    });
  });

  describe("15. Testing the template '/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?'", function () {
    const re = new PathMatcher(
      '/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?',
    );
    const reend = new PathMatcher(
      '/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?',
      {case: false, toEnd: false},
    );
    console.log('15. REGEXP toEnd[true]: ', re.regexp);
    console.log('15. REGEXP toEnd[false]:', reend.regexp);

    it("15.1 pattern matches string '/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333'.   \n\tresult: `{ id: '123',   key: [ '111', '222', '333' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function () {
      expect(re.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333')).toEqual({
        id: '123',
        key: ['111', '222', '333'],
        post: 'qwerty',
        foo: ['foo'],
        multi: ['p01.png', 'p02.png', 'p03.png'],
      });
      expect(reend.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333')).toEqual({
        id: '123',
        key: ['111', '222', '333'],
        post: 'qwerty',
        foo: ['foo'],
        multi: ['p01.png', 'p02.png', 'p03.png'],
      });
    });
    it("15.2 pattern matches string '/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png'.       \n\tresult: `{ id: '123',   key: [ '111', '222' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function () {
      expect(re.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png')).toEqual({
        id: '123',
        key: ['111', '222'],
        post: 'qwerty',
        foo: ['foo'],
        multi: ['p01.png', 'p02.png', 'p03.png'],
      });
      expect(reend.match('/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png')).toEqual({
        id: '123',
        key: ['111', '222'],
        post: 'qwerty',
        foo: ['foo'],
        multi: ['p01.png', 'p02.png', 'p03.png'],
      });
    });
    it("15.3 pattern matches string '/user/123/bar/111fak/foo/test/pictures-p01.png, p02.png, p03.png'.       \n\tresult: `{ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function () {
      expect(re.match('/user/123/bar/111fak/foo/test/pictures-p01.png, p02.png, p03.png')).toEqual({
        id: '123',
        key: ['111'],
        post: undefined,
        foo: ['foo'],
        multi: ['p01.png', 'p02.png', 'p03.png'],
      });
    });
    it("15.4 pattern matches string '/user/123/bar/111fak/foo/test/pictures-p01.png'.       \n\tresult: `{ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png' ] }`", function () {
      expect(re.match('/user/123/bar/111fak/foo/test/pictures-p01.png')).toEqual({
        id: '123',
        key: ['111'],
        post: undefined,
        foo: ['foo'],
        multi: ['p01.png'],
      });
    });
  });

  describe("16. Testing the template '/:foo/:bar/:baz(.*)'", function () {
    const re = new PathMatcher('/:foo/:bar/:baz(.*)');
    const reend = new PathMatcher('/:foo/:bar/:baz(.*)', {case: false, toEnd: false});
    console.log('16. REGEXP toEnd[true]: ', re.regexp);
    console.log('16. REGEXP toEnd[false]:', reend.regexp);

    it("16.1 pattern matches string '/foo/bar'.   \n\tresult: `{ foo: 'foo', bar: 'bar', baz: undefined }`", function () {
      expect(re.match('/foo/bar')).toEqual({foo: 'foo', bar: 'bar', baz: undefined});
      expect(reend.match('/foo/bar')).toEqual({foo: 'foo', bar: 'bar', baz: undefined});
    });

    it("16.2 pattern matches string '/foo/bar/baz'.   \n\tresult: `{ foo: 'foo', bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match('/foo/bar/baz')).toEqual({foo: 'foo', bar: 'bar', baz: 'baz'});
      expect(reend.match('/foo/bar/baz')).toEqual({foo: 'foo', bar: 'bar', baz: 'baz'});
    });

    it("16.3 pattern matches string '/foo/bar/baz/eve'.   \n\tresult: `{ foo: 'foo', bar: 'bar', baz: 'baz/eve' }`", function () {
      expect(re.match('/foo/bar/baz/eve')).toEqual({foo: 'foo', bar: 'bar', baz: 'baz/eve'});
      expect(reend.match('/foo/bar/baz/eve')).toEqual({foo: 'foo', bar: 'bar', baz: 'baz'});
    });
  });

  describe("17. Testing the template '/:foo/:bar/:baz(.*)*'", function () {
    const re = new PathMatcher('/:foo/:bar/:baz(.*)*');
    const reend = new PathMatcher('/:foo/:bar/:baz(.*)*', {case: false, toEnd: false});
    console.log('17. REGEXP toEnd[true]: ', re.regexp);
    console.log('17. REGEXP toEnd[false]:', reend.regexp);

    it("17.1 pattern matches string '/foo/bar'.   \n\tresult: `{ foo: 'foo', bar: 'bar', baz: [] }`", function () {
      expect(re.match('/foo/bar')).toEqual({foo: 'foo', bar: 'bar', baz: []});
      expect(reend.match('/foo/bar')).toEqual({foo: 'foo', bar: 'bar', baz: []});
    });

    it("17.2 pattern matches string '/foo/bar/baz'.   \n\tresult: `{ foo: 'foo', bar: 'bar', baz: ['baz'] }`", function () {
      expect(re.match('/foo/bar/baz')).toEqual({foo: 'foo', bar: 'bar', baz: ['baz']});
      expect(reend.match('/foo/bar/baz')).toEqual({foo: 'foo', bar: 'bar', baz: ['baz']});
    });

    it("17.3 pattern matches string '/foo/bar/baz/eve'.   \n\tresult: `{ foo: 'foo', bar: 'bar', baz: ['baz/eve'] }`", function () {
      expect(re.match('/foo/bar/baz/eve')).toEqual({foo: 'foo', bar: 'bar', baz: ['baz/eve']});
      expect(reend.match('/foo/bar/baz/eve')).toEqual({foo: 'foo', bar: 'bar', baz: ['baz/eve']});
    });
  });
});
