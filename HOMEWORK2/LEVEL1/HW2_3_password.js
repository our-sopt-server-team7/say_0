/* --------------------- */ 
/* 3. 비밀번호 암호화하기 */ 
/* --------------------- */ 

//파일 읽어오기
const fs = require('fs');

const title1 = 'password';
const data1 = fs.readFileSync(`${__dirname}/${title1}.txt`); //파일을 못 찾아서 주소 지정해줌
console.log(`${title1}.txt 파일에는 "${data1}"라는 비밀번호가 적혀 있습니다.\n`);


//비밀번호 암호화
const crypto = require('crypto');
var hashed;

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        hashed = derivedKey.toString('hex');
        console.log('salt : ', salt);
        console.log('hashed : ', hashed);

    //암호화된 비밀번호를 담은 파일 생성
    const title2 = 'hashed';
    const data2 = `파일이 잘 만들어졌어요!\n암호화된 비밀번호는 '${hashed}'입니다.`;
    fs.writeFileSync(`${__dirname}/${title2}.txt`, data2);
    console.log(`\n암호화된 비밀번호를 작성한 파일을 "${title2}.txt"로 생성했습니다.\n`);
    });
}
const salt = crypto.randomBytes(32).toString('hex');
encrypt(salt, data1);