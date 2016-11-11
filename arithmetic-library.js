'use strict';

// TODO: trim
// Can't add .vscode to gitignore

(function(exports) {
  /**
   * Addition of two numbers that should represents like string
   * @param {string} a
   * @param {string} b
   * @return {string} Sum of a and b
   */
  function _add(a, b) {
    if (a.length < b.length) {
      // node don't support this constructon [a,b]=[b,a]
      b = [a, a = b][0];
    }

    let arrayResult = [];

    let memory = '0';
    let ai;
    let bi;
    for (ai = a.length-1, bi = b.length-1; bi >= 0; ai--, bi--) {
      let sum = String(+a[ai] + +b[bi] + +memory);
      if (sum.length == 2) {
        memory = sum[0];
        arrayResult.push(sum[1]);
      } else {
        memory = '0';
        arrayResult.push(sum[0]);
      }
    }

    while (ai >= 0) {
      let sum = String(+a[ai] + +memory);
      if (sum.length == 2) {
        memory = sum[0];
        arrayResult.push(sum[1]);
      } else {
        memory = '0';
        arrayResult.push(sum[0]);
      }

      ai--;
    }

    if (memory != '0') {
      arrayResult.push(memory);
    }

    let result = '';
    for (let i = arrayResult.length-1; i >= 0; i--) {
      result += arrayResult[i];
    }

    return result;
  }

  /**
   * Subtraction of a(minuend) and b(subtrahend)
   * @param {string} a - minuend
   * @param {string} b - subtrahend
   * @return {string} difference
   */
  function _subtract(a, b) {
    let aNum = [];
    for (let i = 0; i < a.length; i++) {
      aNum.push(+a[i]);
    }

    let bNum = [];
    for (let i = 0; i < b.length; i++) {
      bNum.push(+b[i]);
    }

    let ai;
    let bi;
    for (ai = aNum.length-1, bi = bNum.length-1; bi >= 0; ai--, bi--) {
      if (aNum[ai] < bNum[bi]) {
        let i = ai-1;
        while (aNum[i] == 0) {
          i--;
        }
        aNum[i] -= 1;
        i++;
        while (i < ai) {
          // aNum[i] = aNum[i] + 9 don't make scense coz all this a[i] should be 0
          aNum[i] = 9;
          i++;
        }
        aNum[ai] += 10;
      }

      aNum[ai] -= bNum[bi];
    }


    let result = '';
    let i = 0;

    while (aNum[i] == 0) {
      i++;
    }
    for (i = i; i < aNum.length; i++) {
      result += aNum[i];
    }

    return result;
  }

  /**
   * Multiplication of a and b
   * @param {string} a
   * @param {string} b
   * @return {string} myltiplication
   */
  function _multiply(a, b) {
    if (a.length < b.length) {
      // node don't support this constructon [a,b]=[b,a]
      b = [a, a = b][0];
    }

    let aArr = createArrayFormString(a);
    let bArr = createArrayFormString(b);

    let ai;
    let bi;
    for (ai = aArr.length-1, bi = bArr.length-1; bi >= 0; ai--, bi--) {

    }

  }

  /**
   * Create array from number string
   * @param {string} str
   * @return {Array<number>} array of numbers from string
   */
  function createArrayFormString(str) {
    let arr = [];

    for (let i = 0; i < str.length; i++) {
      arr.push(+str[i]);
    }

    return arr;
  }

  /**
   * Check if the string represents number with or without signs
   * @param {string} str
   * @return {boolean} true if str represent string
   */
  function isNumber(str) {
    let result = str.match(/^[+-]?\d+$/);
    if (result != null) {
      return true;
    } else {
      return false;
    }
  }


  exports.add = function(a, b) {
    if (!isNumber(a) || !isNumber(b)) {
      return null;
    }

    let isNegativeA = false;
    let isNegativeB = false;

    if (a[0] == '-') {
      isNegativeA = true;
      a = a.slice(1);
    } else if (a[0] == '+') {
      a = a.slice(1);
    }

    if (b[0] == '-') {
      isNegativeB = true;
      b = b.slice(1);
    } else if (b[0] == '+') {
      b = b.slice(1);
    }

    let result = '';

    if (isNegativeA == false && isNegativeB == false) {  // a+b = a+b (a+b)
      result = _add(a, b);
    } else if (isNegativeA == true && isNegativeB == false) { // -a+b = (b-a||-(a-b))
      if ((a.length > b.length) || (a.length == b.length && +a[0] > +b[0])) {
        result = '-' + _subtract(a, b);
      } else {
        result = _subtract(b, a);
      }
    } else if (isNegativeA == true && isNegativeB == true) { // -a+-b = -(a+b)
      result = '-' + _add(a, b);
    } else { // (isNegativeA == false && isNegativeB == true)     a+-b = (a-b||-(b-a))
      if ((a.length > b.length) || (a.length == b.length && +a[0] > +b[0])) {
        result = _subtract(a, b);
      } else {
        result = '-' + _subtract(b, a);
      }
    }


    return result;
  };

  exports.subtract = function(a, b) {
    if (!isNumber(a) || !isNumber(b)) {
      return null;
    }

    let isNegativeA = false;
    let isNegativeB = false;

    if (a[0] == '-') {
      isNegativeA = true;
      a = a.slice(1);
    } else if (a[0] == '+') {
      a = a.slice(1);
    }

    if (b[0] == '-') {
      isNegativeB = true;
      b = b.slice(1);
    } else if (b[0] == '+') {
      b = b.slice(1);
    }

    let result = '';

    if (isNegativeA == false && isNegativeB == false) {  // a-b = a-b (a-b||-(b-a))
      if ((a.length > b.length) || (a.length == b.length && +a[0] > +b[0])) {
        result = _subtract(a, b);
      } else {
        result = '-' + _subtract(b, a);
      }
    } else if (isNegativeA == true && isNegativeB == false) { // -a-b=-(a+b)
      result = '-' + _add(a, b);
    } else if (isNegativeA == true && isNegativeB == true) { // -a--b=-a+b (-(a-b)||b-a)
      if ((a.length > b.length) || (a.length == b.length && +a[0] > +b[0])) {
        result = '-' + _subtract(a, b);
      } else {
        result = _subtract(b, a);
      }
    } else { // (isNegativeA == false && isNegativeB == true)     a--b=a+b
      result = _add(a, b);
    }

    return result;
  };

  exports.multiply = function() {

  };
}(typeof exports === 'undifined' ? this['asmd']={} : exports));

