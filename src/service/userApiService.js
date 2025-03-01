import db from '../models/index';
import { checkEmailExist, checkPhoneExist, checkUsernameExist, hashUserPassword } from '../service/loginRegisterService';
const getAllUsers = async () => {
    try {
        let users = await db.User.findAll(
            {
                attributes: ["id", "username", "email", "phone", "sex"],
                include: { model: db.Group, attributes: ["name", "description"], }
            }
        );
        console.log("Check users", users);
        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'No data found',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        return {
            EM: 'Error while getting data',
            EC: -1,
            DT: ''
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: { model: db.Group, attributes: ["name", "description", "id"], },
            order: [['id', 'DESC']]
        })
        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: 'get data successfully',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error while getting data',
            EC: 1,
            DT: ''
        }
    }
}


const createNewUser = async (data) => {
    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already existed.',
                EC: 1,
                DT: "email"
            }
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already existed.',
                EC: 1,
                DT: "phone"
            }
        }
        let isUsernameExist = await checkUsernameExist(data.username);
        if (isUsernameExist === true) {
            return {
                EM: 'The username is already existed.',
                EC: 1,
                DT: "username"
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(data.password);
        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: 'Create user successfully',
            EC: 0,
            DT: []
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error while create new user',
            EC: 1,
            DT: ''
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with loading group data.",
                EC: 1,
                DT: "group"
            }
        }
        let user = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (user) {
            //update
            await user.update({
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update user successfully',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'User not found',
                EC: 2,
                DT: ''
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error while getting data',
            EC: 1,
            DT: ''
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: id
            }
        })
        if (user) {
            await user.destroy()
            return {
                EM: 'Delete user successfully',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error while deleting user',
            EC: 1,
            DT: ''
        }
    }
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser, getUserWithPagination
}