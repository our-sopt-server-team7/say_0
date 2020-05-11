/* --------------- */
/* 2. 계산기 모듈  */
/* -------------- */

module.exports = {
    sum : (a,b) => {
        return a+b;
    },
    sub : (a,b) => {
        return a-b;
    },
    mul : (a,b) => {
        return a*b;
    },
    div : (a,b) => {
        return a/b;
    }
}

/* 파트장님은 아래처럼 코드 작성하셨던데 뭐가 다른 걸까? 고민해보기
var calculator = {
    sum : (...args) => {
        return args.reduce((a,b) =>{
            return a + b;
        });
    },
    sub : (...args) => {
        return args.reduce((a,b) =>{
            return a - b;
        });
    },
    mul : (...args) =>{
        return args.reduce((a,b) => {
            return a*b;
        });
    },
    div : (...args) => {
        return args.reduce((a,b) => {
            return a / b;
        });
    }
}
*/

module.exports = calculator;
