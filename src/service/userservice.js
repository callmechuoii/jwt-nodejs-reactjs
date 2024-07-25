import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';





const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, username, password) => {
    let hashPassword = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            'INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashPassword]
        );
    } catch (err) {

    }

}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            'SELECT * FROM users'
        );
        return rows;
    } catch (err) {
        console.log(err);
    }

}

const deleteUser = async (id) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            'DELETE FROM users WHERE id=?', [id]
        );
        return rows;
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            'SELECT * FROM users WHERE id=?', [id]
        );
        return rows;
    } catch (err) {
        console.log(err);
    }
}

const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            'UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]
        );
        return rows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}