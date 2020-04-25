/* ------------------------ */
/* 2. 계산기 모듈 만들어보기 */
/* ------------------------ */

const cal = require('./HW2_2_calculator');

var result = cal.sum(14,21);
console.log("sum result : ", result);

var result = cal.sub(71,26);
console.log("sub result : ", result);

var result = cal.mul(3,7);
console.log("mul result : ", result);

var result = cal.div(121,11);
console.log("div result : ", result);