const UserModel = require('../models/user');
const util = require('../modules/util');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const encrypt = require('../modules/encrypt');
const jwt = require('../modules/jwt');

const user = {
    signup : async (req, res) => {
    //1. request body에서 값을 읽어온다.
    const {id, name, password, email} = req.body;
  
    //예외처리1 : parameter 체크 - 하나라도 null이나 undefined가 들어올 경우
    if(!id || !name || !password || !email){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE)); //400은 요청이 잘못됐다는 오류 메세지
      return;
    }

    //예외처리2 : 아이디 중복 체크
    if (await UserModel.checkUser(id)) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
    }
  
    //2. 새로운 User를 등록한다.
    const salt = encrypt.getSalt(32);
    const pw = encrypt.encryption(salt, password);

    const userIdx = await UserModel.signup(id, name, pw, salt, email);
    if(userIdx === -1) {
      return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
  
    //3. 가입성공
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, {
      userId: userIdx
    }));
    },

    signin : async (req, res) => {
    // 1. request body 에서 데이터 가져오기
    const {id, password} = req.body;
  
    // 예외처리1. request data 확인 - 없다면 Null Value 반환
    if(!id || !password){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
  
    // 예외처리2. 존재하는 아이디인지 확인 - 없다면 No user 반환
    if(await UserModel.checkUser(id) == false){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
      return;
    }

    // 예외처리3. 비밀번호 확인 - 없다면 Miss match password 반환
    if(await UserModel.signin(id, password) == false) {
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
      return;
    }
  
    const user = await UserModel.getUserById(id);
    //모든 인증 과정을 거치고 나서 마지막에 JWT 부여
    const {token,_} = await jwt.sign(user[0]);
    

    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {accessToken : token}));
    },

    readProfile : async (req, res) => {
    // request params 에서 데이터 가져오기
      const {id} = req.params;
      
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if(await UserModel.checkUser(id) == false){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
      return;
    }
      
    // 성공 - read profile success와 함께 전체 정보 출력
    const userprofile = await UserModel.getUserById(id);  //getUserByID(id)의 경우 return 값이 모든 정보였으므로 const 변수에 넣어 사용했음
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, userprofile));
    }
}

module.exports = user;