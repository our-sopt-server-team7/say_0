const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

const auth = {
    checkToken : async (req, res, next) => {
        var token = req.headers.token;
        //token값이 있는지 확인
        if (!token) {
            return res.json(util.fail(CODE.BAD_REQUEST, MSG.EMPTY_TOKEN));
        }
        
        //token값이 있다면 user라는 객체에 값을 넣어줌
        const user = await jwt.verify(token);       //decoded된 data의 값이 들어감 - payload에 넣었던 값이 나옴
    
        //token 기간 만료
        if (user == TOKEN_EXPIRED) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.EXPIRED_TOKEN));
        }
    
        //token이 유효하지 않음
        if (user == TOKEN_INVALID) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
    
        //id가 유효하지 않음 - payload에 idx가 있기 때문에 user.idx를 참조할 수 있다
        if (user.idx == undefined) {
            return res.json(util.fail(CODE.UNAUTHORIZED, MSG.INVALID_TOKEN));
        }
    
        //성공
        //return res.json(util.success(CODE.OK, MSG.AUTH_SUCCESS));
        
        req.decoded = user;
        next();
    }
}

module.exports = auth;