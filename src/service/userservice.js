import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';





const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, username, password) => {
    let hashPassword = hashUserPassword(password);
    connection.query(
        ' INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashPassword],
        function (err, result, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
}

const getUserList = async () => {
    let users = [];
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    // return connection.query(
    //     ' SELECT * from users ',
    //     function (err, result, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = result;
    //         return users;
    //     }
    // );
    // query database
    try {
        const [rows, fields] = await connection.execute(
            'SELECT * FROM users'
        );
        return rows;
    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    createNewUser, getUserList
}