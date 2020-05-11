/* ---------------- */
/* 1. promise logic */
/* ---------------- */

let isMomHappy = true;
let phone = {
    brand : 'Samsung',
    model : 'S20+',
    color : 'Cloud Blue'
}

var willIGetNewPhone = new Promise((resolve, reject) => { //setTimeout에 대해 더 알아보기
    if(isMomHappy){ //isMomHappy가 true일 경우
        resolve(console.log('결과값 : ',phone)); //phone 객체 출력
    }else{
        reject(new Error('mom is not happy')); //mom is not happy가 출력되어야 함
    }
})