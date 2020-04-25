/* ---------------- */
/* 1. promise logic */
/* ---------------- */

let isMomHappy = true;
let phone = {
    brand : 'Samsung',
    model : 'S20+',
    color : 'Cloud Blue'
}

var willIGetNewPhone = new Promise((resolve, reject) => {
    if(isMomHappy){ //isMomHappy가 true일 경우
        setTimeout(()=> { //근데 여기도 setTimeout을 쓰나? setTimeout 쓰임 더 알아보기
            resolve(console.log('결과값 : ',phone)); //phone 객체 출력
        });
    }else{
        setTimeout(()=> {
            reject(new Error('mom is not happy')); //mom is not hapy가 출력되어야 함
        });
    }
})