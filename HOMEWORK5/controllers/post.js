const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const PostModel = require('../models/post');

const post = {
    showAllPost : async (req, res) => {
        var result = await PostModel.showAllPost();
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {
          posts : result,
          postNum : result.length
        }));
    },

    searchPost : async (req, res) => {
        const postIdx = req.params.postIdx;
        
          // 존재하는 아이디인지 확인 - 없다면 No post 반환
          if(await PostModel.checkPostID(postIdx) == false){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
            return;
          }
          
          // 성공 - read profile success와 함께 post id, title, contents 반환
          var result = await PostModel.searchPost(postIdx);
          res.status(statusCode.OK)
          .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {
            postInfo : result
          }));
          return;
    },

    createPost : async(req, res) => {
        // 1. request body에서 값을 읽어온다.
        const {title, contents, author} = req.body;
      
        // 예외처리 : parameter 체크
        if(!title || !contents || !author){
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
          return;
        }
    
        // 2. 새로운 POST를 등록한다. post의 id는 자동으로 +1
        var result = await PostModel.createPost(title, contents, author);
      
        // 3. POST 작성 성공
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_POST, {
          postInfo : result
        }));
    },

    editPost : async(req, res) => {
        // 1. request body에서 값을 읽어온다.  
        const {title, contents, author} = req.body;
        const postIdx = req.params.postIdx;
        
        // 예외처리 : parameter 체크
          if(await PostModel.checkPostID(postIdx) == false){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
            return;
          }
      
        // 2. 기존 POST의 내용을 수정한다.
        var result = await PostModel.editPost(postIdx,title,contents, author);
        const pageInfo = await PostModel.searchPost(postIdx);
      
        // 3. POST 수정 성공 - 내용 출력
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_SUCCESS,{
          postInfo : pageInfo[0]
        }));
        return;
    },

    deletePost : async(req, res) => {
        // 1. request body에서 값을 읽어온다. 
        const postIdx = req.params.postIdx;
      
        // 예외처리 : parameter 체크
        if(await PostModel.checkPostID(postIdx) == false){ //해당하는 id의 게시글이 존재하지 않는다면
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));  
          return;
        }
      
        // 3. POST 삭제 성공
        var result = await PostModel.deletePost(postIdx);
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_SUCCESS,{
          postID : postIdx
        }));
        return;
    }

}

module.exports = post;