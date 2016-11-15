'use strict';

let assert = require('chai').assert;
let expect = require('chai').expect;
let asmd = require('../arithmetic-library.js');

describe('Arithmetic Library (asmd)', function() {
  it('Should have method add', function() {
    expect(asmd).to.respondTo('add');
  });
  it('Should have method subtract', function() {
    expect(asmd).to.respondTo('subtract');
  });
  it('Should have method multiply', function() {
    expect(asmd).to.respondTo('multiply');
  });

  describe('Function add', function() {
    describe('Short numbers', function() {
      it('add 0 to 5 equal 20', function() {
        assert.equal(asmd.add('0', '5'), '5');
      });

      it('add 0 to 0 equal 0', function() {
        assert.equal(asmd.add('0', '0'), '0');
      });

      it('add 5 to 15 equal 20', function() {
        assert.equal(asmd.add('5', '15'), '20');
      });

      it('add 15 to 5 equal 20', function() {
        assert.equal(asmd.add('15', '5'), '20');
      });

      it('add 999999 to 1 equal 1000000', function() {
        assert.equal(asmd.add('999999', '1'), '1000000');
      });

      it('add 123456789 to 9876564321 equal 20', function() {
        assert.equal(asmd.add('123456789', '987654321'), '1111111110');
      });
    });
    describe('Long numbers', function() {
      it('add 1 to 999999999999999999999999999999 equal 1000000000000000000000000000000', function() {
        assert.equal(asmd.add('1', '999999999999999999999999999999'), '1000000000000000000000000000000');
      });

      it('add 4684684681168468468168151846846816168 to 468684681681681684844168168348 equal 4684685149853150149849836691014984516', function() {
        assert.equal(asmd.add('4684684681168468468168151846846816168', '468684681681681684844168168348'), '4684685149853150149849836691014984516');
      });

      it('add 959269 to 936843684684136846143841618368413861368168866814 equal 4684685149853150149849836691014984516', function() {
        assert.equal(asmd.add('959269', '936843684684136846143841618368413861368168866814'), '936843684684136846143841618368413861368169826083');
      });
    });
    describe('Signed numbers', function() {
      it('add -15 to 5 equal -10', function() {
        assert.equal(asmd.add('-15', '5'), '-10');
      });

      it('add -5 to 15 equal 10', function() {
        assert.equal(asmd.add('-5', '15'), '10');
      });

      it('add 8 to -11 equal -3', function() {
        assert.equal(asmd.add('8', '-11'), '-3');
      });

      it('add -15 to -5 equal -20', function() {
        assert.equal(asmd.add('-15', '-5'), '-20');
      });
    });
  });

  describe('Function subtract', function() {
    describe('Short numers', function() {
      it('subtract 5 from 10 equal 5', function() {
        assert.equal(asmd.subtract('10', '5'), '5');
      });

      it('subtract 14 from 123 equal 109', function() {
        assert.equal(asmd.subtract('123', '14'), '109');
      });

      it('subtract 12 from 100000 equal 99988', function() {
        assert.equal(asmd.subtract('100000', '12'), '99988');
      });

      it('subtract 987654321 from 123456789 equal 864197532', function() {
        assert.equal(asmd.subtract('987654321', '123456789'), '864197532');
      });
      it('subtract 123456789 from 0 equal 123456789', function() {
        assert.equal(asmd.subtract('123456789', '0'), '123456789');
      });
    });
    describe('Long numers', function() {
      it('subtract 48841684844364864643254 from 446468561515684684681681688165465846 equal 446468561515635842996837323300822592', function() {
        assert.equal(asmd.subtract('446468561515684684681681688165465846', '48841684844364864643254'), '446468561515635842996837323300822592');
      });
    });
  });
  describe('Function multiply', function() {
    describe('Short numers', function() {
      it('multiply 5 from 3 equal 15', function() {
        assert.equal(asmd.multiply('5', '3'), '15');
      });

      it('multiply 10 from 10 equal 100', function() {
        assert.equal(asmd.multiply('10', '10'), '100');
      });

      it('multiply 11 from 11 equal 121', function() {
        assert.equal(asmd.multiply('11', '11'), '121');
      });

      it('multiply 5125 from 3465 equal 17758125', function() {
        assert.equal(asmd.multiply('5125', '3465'), '17758125');
      });

      it('multiply 0 from 1 equal 0', function() {
        assert.equal(asmd.multiply('0', '1'), '0');
      });

      it('multiply 2 from 12 equal 24', function() {
        assert.equal(asmd.multiply('2', '12'), '24');
      });

      it('multiply 345 from 436 equal 150420', function() {
        assert.equal(asmd.multiply('345', '436'), '150420');
      });

      it('multiply 586 from 9845 equal 5769170', function() {
        assert.equal(asmd.multiply('586', '9845'), '5769170');
      });

      it('multiply 99 from 99 equal 891', function() {
        assert.equal(asmd.multiply('99', '99'), '9801');
      });

      it('multiply 999 from 9999 equal 9989001', function() {
        assert.equal(asmd.multiply('999', '9999'), '9989001');
      });

      it('multiply 108 from 198 equal 21384', function() {
        assert.equal(asmd.multiply('108', '198'), '21384');
      });

      it('multiply 98435126 from 5952653 equal 585950148089278', function() {
        assert.equal(asmd.multiply('98435126', '5952653'), '585950148089278');
      });
    });
    describe('Long numers', function() {
      it('multiply 4684864846484612862525 from 99968496874968464986969 equal 468338896765446638408932901028214283913436725', function() {
        assert.equal(asmd.multiply('4684864846484612862525', '99968496874968464986969'), '468338896765446638408932901028214283913436725');
      });
    });
  });
});

/*
446468561515684684681681688165465846
000000000000048841684844364864643254
446468561515635842996837323300822592
*/
