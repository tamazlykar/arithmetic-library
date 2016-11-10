var assert = require('chai').assert;
var expect = require('chai').expect;
var asmd = require('../arithmetic-library.js');

describe('Arithmetic Library (asmd)', function() {
  it('Should have method add', function() {
    expect(asmd).to.respondTo('add');
  });

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(asmd.add(), 1);
    });
  });
});
