//조원들을 정보로 하는 JSON 배열을 만들어 출력하기

var GROUP7 = [ 
    {
        name: '백선혜',
        nickname: '알',
        age: 22,
        printName : function () {
            console.log(this.name+'님의 별명은 "'+this.nickname+'"이고, '+this.age+'세입니다.')
        }
    },
    {
        name: '박현주',
        nickname: '고',
        age: 25,
        printName : function () {
            console.log(this.name+'님의 별명은 "'+this.nickname+'"이고, '+this.age+'세입니다.')
        }
    },
    {
        name: '김성윤',
        nickname: '싶',
        age: 23,
        printName : function () {
            console.log(this.name+'님의 별명은 "'+this.nickname+'"이고, '+this.age+'세입니다.')
        }
    },
    {
        name: '천명희',
        nickname: '어',
        age: 24,
        printName : function () {
            console.log(this.name+'님의 별명은 "'+this.nickname+'"이고, '+this.age+'세입니다.')
        }
    },
    {
        name: '최정균',
        nickname: '요',
        age: 25,
        printName : function () {
            console.log(this.name+'님의 별명은 "'+this.nickname+'"이고, '+this.age+'세입니다.')
        }
    }
];

//위의 JSON 배열 전체 출력
//console.log(GROUP7);
//console.log(JSON.stringify(GROUP7));
//console.log();

var seyoung = { 
    name : '장세영',
    nickname : '솅',
    others : '대학솅, 솅솅정보통',
    age : 22,
    univ : '이화여자대학교',
};
console.log('안녕하세요! 저는 '+seyoung.name+'입니다. 제 별명은 "'+seyoung.nickname+'"이고 '+seyoung.others+' 등으로 다양하게 쓰입니다. 나이는 '+seyoung.age+'세이고, '+seyoung.univ+'에 재학중입니다!');
console.log('첫 세미나에 참석하지 못해서 조원 분들의 별명을 몰라서 임의로 설정했습니다ㅠㅠ 여러분께 보내는.. 제 메세지.. 조원들 빨리 만나고 싶어요 흑흑..');
console.log('');

//forEach 사용
GROUP7.forEach(  
    GROUP7 => console.log(GROUP7.name+'님의 별명은 "'+GROUP7.nickname+'"이고, '+GROUP7.age+'세입니다.')
);
