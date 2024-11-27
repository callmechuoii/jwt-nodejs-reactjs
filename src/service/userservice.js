import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';




const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, username, password) => {
    let hashPassword = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPassword
        })
    } catch (err) {

    }

}

const getUserList = async () => {

    let users = [];
    users = await db.User.findAll();
    return users;
    // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'SELECT * FROM user'
    //     );
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    // }

}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId
        }
    });
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'DELETE FROM user WHERE id=?', [id]
    //     );
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    // }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: {
            id: id
        }
    })
    return user.get({ plain: true });
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'SELECT * FROM user WHERE id=?', [id]
    //     );
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    // }
}

const updateUserInfor = async (email, username, id) => {
    await db.User.update(
        {
            email: email, username: username
        },
        {
            where: {
                id: id
            }
        });
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird,
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]
    //     );
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    // }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}