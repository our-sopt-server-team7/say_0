/* --------------- */
/* 2. 계산기 모듈  */
/* -------------- */

const cal = require('./HW2_2_calculator');

var sumresult = cal.sum(14,21);
console.log("sum result : ", sumresult);

var subresult = cal.sub(71,26);
console.log("sub result : ", subresult);

var mulresult = cal.mul(3,7);
console.log("mul result : ", mulresult);

var divresult = cal.div(121,11);
console.log("div result : ", divresult);