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

router.post('/signup', async (req, res) => {
  const {
      id,
      name,
      password,
      email
  } = req.body;
  if (!id || !name || !password || !email) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
  }
  // 사용자 중인 아이디가 있는지 확인
  if (await UserModel.checkUser(id)) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
      return;
  }
  const {
      salt,
      hashed
  } = await encrypt.encrypt(password);
  const idx = await UserModel.signup(id, name, hashed, salt, email);
  if (idx === -1) {
      return res.status(statusCode.DB_ERROR)
          .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }
  res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.CREATED_USER, {
          userId: idx
      }));
});

router.post('/signin', async (req, res) => {
  const {
      id,
      password
  } = req.body;
  if (!id || !password) {
      res.status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
  }
  
    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const user = await UserModel.getUserById(id);
    if (user[0] === undefined) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }
    
    // 비밀번호 확인 - 없다면 Miss match password 반환
    const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
    if (hashed !== user[0].password){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    }
  
    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userIdx : user[0].userIdx}));
  });


  /* 
    ✔️ get profile
    METHOD : GET
    URI : localhost:3000/user/profile/:id
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User Id, name, email
*/
/*
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
  */
  module.exports = router;