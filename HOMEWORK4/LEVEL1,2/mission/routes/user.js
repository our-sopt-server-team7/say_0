var express = require('express');
var router = express.Router();

const util = require('../modules/util');
const encrypt = require('../modules/encrypt');
const UserModel = require('../models/user');
const resMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

/*
  ✔️ sign up
  METHOD : POST
  URI : localhost:3000/user/signup
  REQUEST BODY : id, name, password, email
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : User ID
*/

//models/user.js에서 조건을 모두 설정해두었으므로 이 소스에서는 await UserModel.이름(파라미터)로 사용하면 된다.
//return값을 t/f로 설정했으므로 if문에 주로 들어감

router.post('/signup', async(req, res) => {
    //1. request body에서 값을 읽어온다.
    const {id, name, password, email} = req.body;
  
    //예외처리1 : parameter 체크 - 하나라도 null이나 undefined가 들어올 경우
    if(!id || !name || !password || !email){
      //res.status(400).send('파라미터 값이 잘못되었습니다.');
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE)); //400은 요청이 잘못됐다는 오류 메세지
      return;
    }

    //예외처리2 : 아이디 중복 체크
    if (await UserModel.checkUser(id)) {
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
    }
  
    //2. 새로운 User를 등록한다.
    const salt = encrypt.getSalt(32);
    const pw = encrypt.encryption(salt, password);
    //UserModel.push({id, name, salt, pw, email});
    
    const idx = await UserModel.signup(id, name, pw, salt, email);  //hased된 pw로 salt와 함께 저장
    if(idx === -1) {
      return res.status(statusCode.DB_ERROR)
      .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
  
    //3. 응답 메세지를 보낸다.
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userID: idx}));
  });
  
  
  
  
  
  /* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
    REQUEST BODY : id, password
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
  */
  
  router.post('/signin', async (req, res) => {
    // request body 에서 데이터 가져오기
    const {id, password} = req.body;
  
    // request data 확인 - 없다면 Null Value 반환
    if(!id || !password){
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
  
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if(await UserModel.checkUser(id) == false){
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
      return;
    }
    
    // 비밀번호 확인 - 없다면 Miss match password 반환
    if(await UserModel.signin(id, password) == false) {
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
      return;
    }
  
    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userID : id}));
  });


  /* 
    ✔️ get profile
    METHOD : GET
    URI : localhost:3000/user/profile/:id
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User Id, name, email
*/

router.get('/profile/:id', async (req, res) => {
    // request params 에서 데이터 가져오기
    const {id} = req.params;
  
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    if(await UserModel.checkUser(id) == false){
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
      return;
    }
  
    // 성공 - read profile success와 함께 전체 정보 출력
    const userprofile = await UserModel.getUserById(id);  //getUserByID(id)의 경우 return 값이 모든 정보였으므로 const 변수에 넣어 사용했음
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, userprofile));
  });
  
  module.exports = router;