var express = require('express');
var router = express.Router();

let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
//let PostModel = require('../models/post');
let PostModel = [];

/*
  ✔️ 모든 게시글 조회
  METHOD : GET
  URI : localhost:3000/post
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : id, title, contents, by
*/

router.get('/', function (req, res) {
  // 게시글이 존재하지 않을 때  
  if(PostModel.length == 0){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
        return;
  }
  
  // 전체 게시글 조회 성공
  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {
    posts : PostModel
  }));
});




/*
  ✔️ 게시글 고유 id 값을 조회
  METHOD : GET
  URI : localhost:3000/post/:id
  REQUEST BODY : id
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : id, title, contents, by
*/


router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);//이게 숫자로 인식을 못하네... -> parseInt 사용함!
  
    // 존재하는 아이디인지 확인 - 없다면 No post 반환
    const post = PostModel.filter(post => post.id === id);
    if(post.length == 0){
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
      return;
    }
  
    // 성공 - read profile success와 함께 post id, title, contents 반환
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {
        postID : post[0].id,
        postName : post[0].title,
        postBy : post[0].by,
        postEmail : post[0].contents
      }
    ));
});





/*
  ✔️ 게시글 생성
  METHOD : POST
  URI : localhost:3000/post
  REQUEST BODY : id, title, contents, by
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : id
*/

router.post('/', async(req, res) => {
    // 1. request body에서 값을 읽어온다.
    const {title, contents, by} = req.body;
  
    // 예외처리 : parameter 체크
    if(!title || !contents || !by){
      res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
  
    // 2. 새로운 POST를 등록한다. post의 id는 자동으로 +1
    let id;
    if(PostModel.length==0){ //존재하는 게시글이 없다면
        id = 1; //지금 작성하는 게시글의 id는 1
    }else{ //이미 게시글이 존재한다면
        id = PostModel[PostModel.length-1].id+1; //가장 최근에 작성된 게시글의 id+1이 지금 작성하는 게시글의 id
    }
    PostModel.push({id, title, contents, by});
  
    // 3. POST 작성 성공
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.CREATED_POST, {
      postID : id
    }));
});




/*
  ✔️ 게시글 고유 id값을 가진 게시글을 수정
  METHOD : PUT
  URI : localhost:3000/post/:id
  REQUEST BODY : id, title, contents, by
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : id
*/

router.put('/:id', function(req, res) {
  // 1. request body에서 값을 읽어온다.  
  const {title, contents, by} = req.body;
  
  // 예외처리 : parameter 체크
  if(!title || !contents || !by){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  // 2. 기존 POST의 내용을 수정한다.
  const id = parseInt(req.params.id);
  const post = PostModel.filter(post => post.id === id);
  if(id === -1){ //해당하는 id의 게시글이 존재하지 않는다면
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));  
    return;
  }
  // 존재한다면 기존 내용 수정하기
  //splice 사용. 배열의 특정 구간을 추출하거나, 특정 구간에 특정 배열을 추가할 때 사용
  //문법 : array.splice(index, howmany, element1, ...., elementN);
  PostModel.splice(id-1, 1, {id, title, contents, by});
  
  // 3. POST 수정 성공 - 내용 출력
  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.EDITED_POST, {
    postID : post[id-1].id
  }));

});



/*
  ✔️ 게시글 고유 id값을 가진 게시글을 삭제
  METHOD : DELETE
  URI : localhost:3000/post/:id
  REQUEST BODY : id, title, contents, by
  RESPONSE STATUS : 200 (OK)
  RESPONSE DATA : id
*/

router.delete('/:id', function (req,res) {
  // 1. request body에서 값을 읽어온다. 
  const id = parseInt(req.params.id);

  // 예외처리 : parameter 체크
  if(id === -1){ //해당하는 id의 게시글이 존재하지 않는다면
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));  
    return;
  }

  PostModel.splice(id-1,1);
  // 3. POST 삭제 성공
  res.status(statusCode.OK)
  .send(util.success(statusCode.OK, resMessage.DELETEED_POST, {
    postID : id
  }));


})

console.log('PostModel : ', PostModel);
module.exports = router;