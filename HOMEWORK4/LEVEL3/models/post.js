const pool = require('../modules/pool');
const table = 'post';

const post = {
    showAllPost : async () => {
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            console.log('showAllPost ERROR : ', err);
            throw err;
        }
    },

    createPost: async (title, contents, author) => {
        const fields = 'title, contents, author';
        const questions = `?, ?, ?`; 
        const values = [title, contents, author];   //파라미터로 받은 데이터들을 그대로 배열로 만들어서 넘겨줌
        const query = `INSERT INTO ${table} (${fields}) VALUES (${questions})`;     // INSERT INTO user (title, contents, author) VALUES (?, ?, ?)
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;   //삽입할 때 AI되는 id.
            console.log(insertId);
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createdPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createdPost ERROR : ', err);
            throw err;
        }
    },
    
    //해당 id의 post가 존재하는지 확인
    checkPostID: async (postIdx) => {
        const query = `SELECT * FROM ${table} WHERE postIdx = "${postIdx}"`;    //해당 아이디에 해당하는 모든 데이터
        try{
            const result = await pool.queryParam(query);
            if( result.length === 0 ){  //id에 해당하는 정보가 없다면
                return false;   //false 반환 -> routes/post.js에서 이 결과값으로 아이디 체크
            } else{
                return true;
            } //if문에 걸리지 않았다면 정보가 있다는 의미
        } catch(err){
            console.log('checkPostID ERROR: ', err);
            throw err;
        }
    },

    //해당 id 게시글 조회
    searchPost : async (postIdx) => {
        const query = `SELECT * FROM ${table} WHERE postIdx = "${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('searchPost ERROR: ', err);
            throw err;
        }
    },
    

    editPost : async(postIdx, title, contents, author) => {
        const query = `UPDATE ${table} SET title = "${title}", contents = "${contents}", author = "${author}" WHERE postIdx="${postIdx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('editPost ERROR: ', err);
            throw err;
        }

    },

    //post 삭제
    deletePost : async(postIdx) => {
        const query = `DELETE FROM ${table} WHERE postIdx = ${postIdx}`;  //데이터베이스에서 해당하는 정보를 delete
        try{
            var result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('deletePost ERROR: ', err);
            throw err;
        }
    },
}

module.exports = post;