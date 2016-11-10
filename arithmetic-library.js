'use strict';

// TODO: check if all string is numeric
// Can't add .vscode to gitignore

(function(exports) {
  exports.add = function(a, b) {
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
  };

  exports.subtract = function() {

  };

  exports.multiply = function() {

  };
}(typeof exports === 'undifined' ? this['asmd']={} : exports));

