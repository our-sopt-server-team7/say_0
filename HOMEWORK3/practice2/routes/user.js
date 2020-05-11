var express = require('express');
var router = express.Router();
let UserModel = require('../models/user');
let util = require('../modules/util');
let resMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');

/*
  ✔️ sign up
  METHOD : POST
  URI : localhost:3000/user/signup
  REQUEST BODY : id, name, password, email
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : User ID
*/

router.post('/signup', async(req, res) => {
  //1. request body에서 값을 읽어온다.
  const {id, name, password, email} = req.body;

  //예외처리1 : parameter 체크 - 하나라도 null이나 undefined가 들어올 경우
  if(!id || !name || !password || !email){
    //res.status(400).send('파라미터 값이 잘못되었습니다.');
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE)); //400은 요청이 잘못됐다는 오류 메세지
    return;
  }

  //예외처리2 : 아이디 중복 체크
  if(UserModel.filter(it => it.id == id). length > 0){
    //res.status(400).send({message : 'ALREADY ID'});
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }

  //2. 새로운 User를 등록한다.
  UserModel.push({id, name, password, email});

  //3. 응답 메세지를 보낸다.
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, {userID : id}));
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
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  const user = UserModel.filter(user => user.id == id);
  if(user.length == 0){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  // 비밀번호 확인 - 없다면 Miss match password 반환
  if(user[0].password != password){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    return;
  }

  // 성공 - login success와 함께 user Id 반환
  //어떤 예외에도 return되지 않았기 때문에 성공. return문 따로 만들 필요 X
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userID : id}));
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
  const user = UserModel.filter(user => user.id == id);
  if(user.length == 0){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  // 성공 - login success와 함께 user Id 반환
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userID : id}));
});

module.exports = router;




/*
router.get('/test', async(req, res) => {
  res.send(req.query);
});

router.get('/test/:idx', async(req, res) => {
  res.send(req.params);
});
*/