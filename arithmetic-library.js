'use strict';

let asmd = (function() {
  function asmd() {

  }

  function add(a, b) {
    if (a.length < b.length) {
      [a, b] = [b, a];
    }


    let result = [];

    let memory;
    for (let ai = a.length, bi = b.length; bi >= 0; ai--, bi--) {
      let sum = a;
      result.push();
    }
  }

  return {
    add: function() {
      return 1;
    },
  };
}());

// TODO JsDOC
