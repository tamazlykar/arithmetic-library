'use strict';

// Can't add .vscode to gitignore

(function(exports) {
  /**
   * Addition of two numbers that should represents like string
   * @param {string} x
   * @param {string} y
   * @return {string} Sum of a and b
   */
  function addArrays(x, y) {
    if (x.length < y.length) {
      [x, y] = [y, x];
    }

    let result = Array(x.length+1).fill(0);

    let xi;
    let yi;
    let ri;
    for (xi = x.length-1, yi = y.length-1, ri = result.length-1;
                                      yi >= 0; xi--, yi--, ri--) {
        let sum = x[xi] + y[yi] + result[ri];
        result[ri] = sum % 10;
        result[ri-1] = sum / 10 ^ 0;
    }

    while (xi >= 0) {
      let sum = x[xi] + result[ri];
      result[ri] = sum % 10;
      result[ri-1] = sum / 10 ^ 0;

      xi--;
      ri--;
    }

    return trimStartZeros(result);
  }

  /**
   * Delete begining zeros in array
   * @param {Array} array
   * @return {Array} array without zetos at begining
   */
  function trimStartZeros(array) {
    let i = 0;
    while (array[i] == 0 && i != array.length-1) {
      i++;
    }

    return array.slice(i);
  }

  /**
   * Subtraction of a(minuend) and b(subtrahend)
   * @param {string} x - minuend
   * @param {string} y - subtrahend
   * @return {string} difference
   */
  function subtractArrays(x, y) {
    let result = x.slice();

    let xi;
    let yi;
    for (xi = result.length-1, yi = y.length-1; yi >= 0; xi--, yi--) {
      if (result[xi] < y[yi]) {
        let i = xi-1;
        while (result[i] == 0) {
          i--;
        }
        result[i] -= 1;
        i++;
        while (i < xi) {
          // aNum[i] = aNum[i] + 9 don't make scense coz all this a[i] should be 0
          result[i] = 9;
          i++;
        }
        result[xi] += 10;
      }

      result[xi] -= y[yi];
    }

    return trimStartZeros(result);
  }

  /**
   * Karatsuba multiplication algorithm
   * @param {string} x
   * @param {string} y
   * @return {Array} result of multiplication
   */
  function karatsuba(x, y) {
    let n = Math.max(x.length, y.length);

    if (x.length != n) {
      x = insertStartZeros(x, n - x.length);
    } else if (y.length != n) {
      y = insertStartZeros(y, n - y.length);
    }


    if (n == 1) {
      let res;
      let sum = x[0]*y[0];

      if (sum > 9) {
        res = Array(2).fill(0);
        res[1] = sum % 10;
        res[0] = sum / 10 ^ 0;
      } else {
        res = Array(1).fill(0);
        res[0] = sum;
      }

      return res;
    }

    let k = n / 2 ^ 0;

    let a = x.slice(0, k);
    let b = x.slice(k);
    let c = y.slice(0, k);
    let d = y.slice(k);

    let ac = karatsuba(a, c);
    let bd = karatsuba(b, d);

    let xlr = addArrays(a, b);
    let ylr = addArrays(c, d);
    let abcd = karatsuba(xlr, ylr); // (a+b)(c+d)

    let diff = subtractArrays(abcd, addArrays(ac, bd));

    let result = Array(n+n).fill(0);
    if (n % 2 != 0) { // magic
      n += 1;
      k += 1;
    }

    for (let i = bd.length-1, ri = result.length-1; i >= 0; i--, ri--) {
      result[ri] = bd[i];
    }


    for (let i = diff.length-1, ri = result.length-k-1; i >= 0; i--, ri--) {
      let sum = result[ri] + diff[i];
      if (sum > 9) {
        result[ri] = sum % 10;
        result[ri-1] += sum / 10 ^ 0;
      } else {
        result[ri] = sum;
      }
    }

    for (let i = ac.length-1, ri = result.length-n-1; i >= 0; i--, ri--) {
      let sum = result[ri] + ac[i];
      if (sum > 9) {
        result[ri] = sum % 10;
        result[ri-1] += sum / 10 ^ 0;
      } else {
        result[ri] = sum;
      }
    }

    return trimStartZeros(result);
  }

  /**
   * Insert zeros in the begining of array
   * @param {Array} array
   * @param {number} n amount of zeros to insertStartZeros
   * @return {Array} new array
   */
  function insertStartZeros(array, n) {
    let zeros = Array(n).fill(0);
    return zeros.concat(array);
  }

  /**
   * Check if the string that represents number with or without signs
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

  /**
   * Return number from string without sign
   * @param {string} str - String that reptesents number
   * @return {string} number without sign
   */
  function getUnsignedNumber(str) {
    if (str[0] == '-' || str[0] == '+') {
      return str.slice(1);
    }
    return str;
  }

  /**
   * Check if the string that represents number is negative
   * @param {string} number - String that reptesents number
   * @return {boolean} true if number is negative
   */
  function isNegative(number) {
    if (number[0] == '-') {
      return true;
    } else {
      return false;
    }
  }


  /**
   * Create array from number string
   * @param {string} numberStr
   * @return {Array} array of numbers from string
   */
  function getNumbersArray(numberStr) {
    let n = numberStr.length;
    let arr = Array(n);

    for (let i = 0; i < n; i++) {
      arr[i] = +numberStr[i];
    }

    return arr;
  }

  /**
   * Return string that created from array elements
   * @param {Array} array - array of numbers
   * @return {string} String that represents array elements
   */
  function getStringFromArray(array) {
    return array.join('');
  }

  /**
   * Addition of two strings
   * @param {string} x
   * @param {string} y
   * @return {string} result of addition
   */
  function _add(x, y) {
    x = getNumbersArray(x);
    y = getNumbersArray(y);

    let result = addArrays(x, y);

    return getStringFromArray(result);
  }

  /**
   * Subtraction of two strings
   * @param {string} x
   * @param {string} y
   * @return {string} result of subtraction
   */
  function _subtract(x, y) {
    x = getNumbersArray(x);
    y = getNumbersArray(y);

    let result = subtractArrays(x, y);

    return getStringFromArray(result);
  }

  exports.add = function(a, b) {
    a = a.trim();
    b = b.trim();
    if (!isNumber(a) || !isNumber(b)) {
      return null;
    }

    let isNegativeA = isNegative(a);
    let isNegativeB = isNegative(b);

    let x = getUnsignedNumber(a);
    let y = getUnsignedNumber(b);

    let result = '';

    if (isNegativeA == false && isNegativeB == false) {  // a+b = a+b (a+b)
      result = _add(x, y);
    } else if (isNegativeA == true && isNegativeB == false) { // -a+b = (b-a||-(a-b))
      if ((x.length > y.length) || (x.length == y.length && +x[0] > +y[0])) {
        result = '-' + _subtract(x, y);
      } else {
        result = _subtract(y, x);
      }
    } else if (isNegativeA == true && isNegativeB == true) { // -a+-b = -(a+b)
      result = '-' + _add(x, y);
    } else { // (isNegativeA == false && isNegativeB == true)     a+-b = (a-b||-(b-a))
      if ((x.length > y.length) || (x.length == y.length && +x[0] > +y[0])) {
        result = _subtract(x, y);
      } else {
        result = '-' + _subtract(y, x);
      }
    }

    return result;
  };

  exports.subtract = function(a, b) {
    a = a.trim();
    b = b.trim();
    if (!isNumber(a) || !isNumber(b)) {
      return null;
    }

    let isNegativeA = isNegative(a);
    let isNegativeB = isNegative(b);

    let x = getUnsignedNumber(a);
    let y = getUnsignedNumber(b);

    let result = '';

    if (isNegativeA == false && isNegativeB == false) {  // a-b = a-b (a-b||-(b-a))
      if ((x.length > y.length) || (x.length == y.length && +x[0] > +y[0])) {
        result = _subtract(x, y);
      } else {
        result = '-' + _subtract(y, x);
      }
    } else if (isNegativeA == true && isNegativeB == false) { // -a-b=-(a+b)
      result = '-' + _add(x, y);
    } else if (isNegativeA == true && isNegativeB == true) { // -a--b=-a+b (-(a-b)||b-a)
      if ((x.length > y.length) || (x.length == y.length && +x[0] > +y[0])) {
        result = '-' + _subtract(x, y);
      } else {
        result = _subtract(y, x);
      }
    } else { // (isNegativeA == false && isNegativeB == true)     a--b=a+b
      result = _add(x, y);
    }

    return result;
  };

  exports.multiply = function(a, b) {
    a = a.trim();
    b = b.trim();
    if (!isNumber(a) || !isNumber(b)) {
      return null;
    }

    let x = getNumbersArray(a);
    let y = getNumbersArray(b);

    let result = karatsuba(x, y);

    return getStringFromArray(result);
  };
}(typeof exports === 'undifined' ? this['asmd']={} : exports));

