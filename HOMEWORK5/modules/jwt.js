const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretKey').secretKey;
const options = require('../config/secretKey').options;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    //로그인
    sign: async (user) => {
        const payload = {           //jwt 내부에 저장할 data - payload(transfer data) - 를 설정해주는 과정
            idx: user.userIdx,
            name: user.name
        };
        const result = {
            token: jwt.sign(payload, secretKey, options),   //외부 모듈 사용해서 jwt 발급 후 token에 넣어줌
            refreshToken: randToken.uid(256)        //일정 시간 이후 Access Token이 만료되었을 때 새로 발급해주는 열쇠 (재발급 시에 rT도 같이 발급)
        };
        return result;
    },

    //검증
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);     //외부 모듈 사용해서 jwt를 data로 decode
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;     //token이 아무 문제 없다면 data return
    }
}