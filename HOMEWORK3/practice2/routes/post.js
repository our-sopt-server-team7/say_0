var express = require('express');
var router = express.Router();
let PostModel = require('../models/post');
let util = require('../modules/util');
let resMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');


/*
  ✔️ 모든 게시글 조회
  METHOD : GET
  URI : localhost:3000/post
  REQUEST BODY : 
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : 
*/




/*
  ✔️ 게시글 고유 id 값을 조회
  METHOD : GET
  URI : localhost:3000/post/:id
  REQUEST BODY : 
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : 
*/



/*
  ✔️ 게시글 생성
  METHOD : POST
  URI : localhost:3000/post
  REQUEST BODY : 
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : 
*/

router.post('/post', async(req, res) => {
    //1. request body에서 값을 읽어온다.
    const {id, title, contents} = req.body;
  
    //2. 새로운 게시글을 등록한다.
    PostModel.push({id, title, contents});
  
    //3. 응답 메세지를 보낸다.
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_USER, {userID : id},'번째 글이 등록되었습니다.'));
  });


/*
  ✔️ 게시글 고유 id값을 가진 게시글을 수정
  METHOD : PUT
  URI : localhost:3000/post/:id
  REQUEST BODY : 
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : 
*/



/*
  ✔️ 게시글 고유 id값을 가진 게시글을 삭제
  METHOD : DELETE
  URI : localhost:3000/post/:id
  REQUEST BODY : 
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : 
*/


module.exports = router;