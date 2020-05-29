const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;  // 입력한 id, name, password, salt, email 값들
        const values = [id, name, password, salt, email];   //파라미터로 받은 데이터들을 그대로 배열로 만들어서 넘겨줌
        const query = `INSERT INTO ${table} (${fields}) VALUES (${questions})`;     // INSERT INTO user (id, name, password, salt, email) VALUES (?, ?, ?, ?, ?)
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            console.log(insertId);
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

    },

    signin: async (id, password) => {
        
    },

    getUserById : async (Id) => {

    }
}

module.exports = user;