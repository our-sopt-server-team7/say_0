/* ------------------ */
/* 1. 변수 재선언 실습 */
/* ------------------ */

//var v1 = 123;
//var v1 = 321; //재선언 가능

//console.log("v1 : ", v1); //321 출력됨

//let l1 = 123;
//let l1 = 321; //error 발생. let은 재선언 불가

//console.log("l1 : ", l1);

//const c1 = 123;
//const c1 = 321; //error 발생. const는 재선언 불가

//console.log("c1 : ", c1);



/* ------------------ */
/* 2. 변수 재할당 실습 */
/* ------------------ */

//var v2 = 'abc';
//v2 = 'def';

//console.log("v2 : ", v2); //def 출력됨. 재할당 가능.

//let l2 = 'abc';
//l2 = 'def';

//console.log("l2 : ", l2); //def 출력됨. 재할당 가능.

//const c2 = 'abc'; 
//c2 = 'def'; //error 발생. const는 재할당 불가

//console.log("c2 : ", c2);



/* --------------------- */
/* 3. 초기화 값 할당 실습 */
/* --------------------- */

//var v3;
//console.log("v3: ", v3); //undefined로 출력됨.

//let l3;
//console.log("l3 : ", l3); //undefined로 출력됨.

//const c3;
//console. log ("c3 : ", c3); //error 발생. const 변수 정의 단계에서 초기화 값 할당 필수.



/* ------------ */
/* 4. 범위 실습 */
/* ----------- */

/*function funcScope() { 
    var v = 123;
    if (true) { 
        var vv = 456; 
        let ll = 'abc'; 
        console.log('var은 function Scope, v : ', v);
        console.log('var은 function Scope, vv : ', vv); 
        console.log('let은 Block Scope, ll : ', ll);
    } 
    //console.log('let은 Block Scope, ll : ', ll); //error 발생. let은 block안에서 선언하면 밖에서 사용X
    console.log('var은 function Scope, v : ', v);
    console.log('var은 function Scope, vv : ', vv);
    }
    //console.log('var은 function Scope, v : ', v); //error 발생. var는 function scope이기 때문.
    //var vv = 789; //만약에 여기서 vv 다시 재선언하면
    //console.log('var은 function Scope, vv : ', vv); //여기서는 789 출력되지 당연히
    funcScope();
*/



/*--------------------*/
/* 5. Array 선언 실습 */
/*--------------------*/
//배열을 생성하는 여러가지 방법

//var server1 = ["요소1", "요소2", 5, null, true]; //배열 리터럴을 이용하는 방법
//var server2 = Array("다음주엔", "과제미리", "하자제발", 13); //Array 객체의 생성자를 이용하는 방법 
//var server3 = new Array("재밌다", "실습", false, undefined, 71); //new 연산자를 이용한 Array 객체 생성 방법

//console.log('server1 : ', server1);
//console.log('server2 : ', server2);
//console.log('server3 : ', server3);
//출력 결과 -> ['요소', '요소'] 로 출력됨



/*--------------------*/
/* 6. Array 추가 실습 */
/*--------------------*/

//server1.push(123); //push() 메소드 이용 
//server2[server2.length] = "우와 이렇게도 인덱스를 정할 수 있겠구나.. 길이.. 오.."; //length 프로퍼티 이용
//server3[99] = "server3의 길이는 얼마일까요? 엥 이거 들어가요?"; //특정 인덱스를 지정해 추가
//와 저렇게 엄청난 인덱스도 들어가네.. <94 empty items>, 하고 출력됨
//배열이 여러 줄로 출력되는 경우 -> 확인 결과 배열 요소가 많아서 밑으로 내려가는 것 같음. 원소 개수를 줄이니까 한 줄에 출력됨.

//console.log('server1 : ', server1); 
//console.log('server2 : ', server2); 
//console.log('server3 : ', server3); 

 

 
/*--------------------*/
/* 7. Array 순회 실습 */
/*--------------------*/

// for-of는 엘리먼트를 하나씩 가져옴
//let str1 = 'server1에는 "'; //var, let만 사용 가능. const의 경우 재할당이 안 되기 때문
//for (var item of server1) { 
//    str1 += item + ', '; 
//}
//str1 += '"이 들어있네요 ~'; //큰따옴표 출력하려면 작은 따옴표 써야됨. 중복 불가. 에러나는 것 확인함.
//console.log(str1);


// for-in은 인덱스를 하나씩 가져옴
//let str2 = 'server2에는 "'; 
//for (var item in server2) { 
//   str2 += server2[item] + ', '; 
//} 
//str2 += '"이(가) 들어있네요 ~'; 
//console.log(str2); 


//forEach는 엘리먼트를 하나씩 가져옴 + callback 함수 등록 가능
//let str3 = 'server3에는 "'; 
//server3.forEach( item => str3 += item + ', '); 
//str3 += '"이(가) 들어있네요 ~'; 
//console.log(str3); 



/*--------------------*/
/* 8. 함수 선언식 실습 */
/*--------------------*/

//function mulNum(x, y) { 
//    console.log(x * y); 
//}
//mulNum(7, 3); //funcName(params)로 실행



/*--------------------*/
/* 9. 함수 표현식 실습 */
/*--------------------*/

//var addStr = function (x, y) { 
//    console.log(x + y); 
//} 
//addStr("함수", " 표현식");
 

// + 화살표 함수 

//var addBoolean = (x, y) => { 
//    console.log(x + y); 
//} 

//addBoolean(true, false); //false=0, true=1



/* ------------------ */ 
/* 10. JSON 객체 실습 */ 
/* ------------------ */

/*var sopt = { 
    name : 'OUR SOPT',
    slogan : 'WE LEAD OUR SOPT',
    part : ['plan', 'design', 'android', 'iOS', 'server'],
    number : 180,
    printName : function () {
        console.log('name : ', this.name)
    },
    printNum : function () {
        console.log('number : ', this.number)
    }
};*/

//console.log('typeof sopt : ' + typeof sopt); 

//console.log('sopt : ' + sopt); //[object Object]로 출력됨
//console.log('sopt : ', sopt); //전체 내용이 {안에} 출력됨
//console.log('sopt :' + JSON.stringify(sopt)); //모든 요소가 "안에" 출력됨

//sopt.printName();
//sopt.printNum();
//sopt.number = 190; //밖에서 재할당 가능
//sopt.printNum(); //바뀜




/* ------------------ */ 
/* 11. JSON 배열 실습 */ 
/* ------------------ */ 

//var dogs = [ 
//    { name: '식빵', family: '웰시코기', age: 1, weight: 2.14}, 
//    { name: '콩콩', family: '포메라니안', age: 3, weight: 2.5}, 
//    { name: '두팔', family: '푸들', age: 7, weight: 3.1} 
//]; 

//console.log('dogs : ' + dogs); //[object Object]가 pair수만큼 나열됨. '쌍'의 type을 출력? 더 찾아보기
//console.log('dogs : ', dogs);
//console.log('dogs :' + JSON.stringify(dogs));

//dogs.forEach(  
//    dog => console.log(dog.name+'이는 종이 '+dog.family+'이고, 나이가 '+dog.age+'세입니다 ~') //화살표 함수 자료 참고하기
//); //안에는 안 붙이고 여기다가 세미콜론을 붙이는구나



/*------------------*/
/* 11. 연산자 테스트 */
/*------------------*/

//var A = '반갑습니다.';
//var B = 4.9;
//var C = ['배열을', '만들어봅시다']; //object type으로 출력됨
//var D = '4.9';
//var E = (B == D); //값 비교
//var F = (B === D); //값이랑 타입 비교
//var G = E && false; //and 연산자
//var H = E || false; //or 연산자
//console.log(typeof(A));
//console.log(typeof(B));
//console.log(typeof(C));
//console.log(typeof(D));
//console.log('B와 E의 값이 같나요?', E);
//console.log('B와 E의 값과 타입이 같나요?', F);
//console.log(G);
//console.log(H);