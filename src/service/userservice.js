import bcrypt from 'bcryptjs';
import mysql from 'mysql2';
// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});

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

const getUserList = () => {
    let users = [];
    connection.query(
        ' SELECT * from users ',
        function (err, result, fields) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        }
    );
}

module.exports = {
    createNewUser, getUserList
}