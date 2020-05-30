//models파일 - 데이터베이스에 접근해서 데이터를 가져오는 역할

const pool = require('../modules/pool');
const encrypt = require('../modules/encrypt');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;  // 입력한 id, name, password, salt, email 값들
        const values = [id, name, password, salt, email];   //파라미터로 받은 데이터들을 그대로 배열로 만들어서 넘겨줌
        const query = `INSERT INTO ${table} (${fields}) VALUES (${questions})`;     // INSERT INTO user (id, name, password, salt, email) VALUES (?, ?, ?, ?, ?)
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;   //삽입할 때 AI됨.
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;    //해당 아이디에 해당하는 모든 데이터
        try{
            const result = await pool.queryParam(query);
            if( result.length === 0 ){  //id에 해당하는 정보가 없다면
                return false;   //false 반환 -> routes/user.js에서 이 결과값으로 아이디 체크
            } else return true; //if문에 걸리지 않았다면 정보가 있다는 의미
        } catch(err){
            console.log('checkUser ERROR: ', err);
            throw err;
        }
    },

    signin: async (id, password) => {
        const query = `SELECT salt, password FROM ${table} WHERE id = "${id}"`; //id에 해당하는 tuple의 salt, password 값 탐색
        try{
            const result = await pool.queryParam(query);
            const pw = encrypt.encryption(result[0].salt, password); 
            if (result[0].password != pw) {
                return false;   //만약 pw가 맞지 않다면 false 반환
            }
            return true;
        } catch(err){
            console.log('signin ERROR: ', err);
            throw err;
        }
    },

    getUserById : async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}"`;    //해당 아이디에 해당하는 모든 데이터
        try{
            const result = await pool.queryParam(query);
            return result; //결과값 출력
        } catch(err){
            console.log('getUserById ERROR: ', err);
            throw err;
        }
    }
}

module.exports = user;