const crypto = require('crypto');

const getSalt = (length) => {
    return crypto.randomBytes(length).toString('hex'); //입력한 length에 따라 random한 salt값 생성
};

const encrypt = (salt, password) => {
    const key = crypto.pbkdf2Sync(password, salt.toString(), 100000, 32, 'sha512'); //salt값을 섞어 비밀번호 암호화
    return key.toString('hex');
};

//user.js에서 접근하기 위해서
module.exports = {
    getSalt: getSalt,
    encryption: encrypt
};