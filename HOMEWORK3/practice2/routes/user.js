var express = require('express');
var router = express.Router();
let User = require()
let responseMessage = require('../modules/responseMessage')
let statusCode = require('../modules')

//1단계
router.post('/signup', async(req, res) => {
  //1. request body에서 값을 읽어온다.
  const {id, name, password, email} = req.body;

  //예외처리1 parameter 체크
  if(!id || !name || !password || !email){
    res.status(statusCode.BAD_REQUEST).send(util.fail(400, 'BAD REQUEST')); //400은 오류 메세지
    return;
  }

  //예외처리2 아이디 중복 체크
  if(User.filter(it => it.id ==id). length > 0){
    res.status(400).send(util.fail(400, 'ALREADY ID'));
    return;
  }

  //2. 새로운 User를 등록한다.
  User.push({id, name, password, email});
  //3. 응답 메세지를 보낸다.
  res.status(200).send(util.success(200, '회원가입 성공', {user : id}));
});

const util = {
  success : (status, message, data) => {
    return {
      status : status,
      success: true,
      message: message,
      data: data
    }
  },
  fail: (status, message) => {
    return {
      status: status,
      success: false,
      message: message
    }
  },
};

module.exports = router;