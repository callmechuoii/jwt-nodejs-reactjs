import db from '../models/index';
const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        });
        const persist = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));
        if (persist.length === 0) {
            return {
                EM: 'Nothing to create!',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persist)
        return {
            EM: `Create succeeds ${persist.length} roles`,
            EC: 0,
            DT: ''
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

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll();
        return {
            EM: 'Getting all roles successfully',
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

const deleteRoles = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: {
                id: id
            }
        });
        if (role) {
            await role.destroy();
            return {
                EM: 'Delete role successfully',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Role not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error while deleting role',
            EC: 1,
            DT: ''
        }
    }

}

const updateRoles = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: {
                id: id
            }
        })
        if (role) {
            //update
            await role.update({
                url: role.url,
                description: role.description
            })
            return {
                EM: 'Update role successfully',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'Role not found',
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Not found any roles',
                EC: 2,
                DT: []
            }
        }
        let roles = await db.Group.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }
        })
        return {
            EM: 'Get roles successfully',
            EC: 0,
            DT: roles
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

const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({
            where: {
                groupId: +data.groupId
            }
        })
        await db.Group_Role.bulkCreate(data.groupRoles)
        return {
            EM: 'Assign Roles To Group Success',
            EC: 0,
            DT: []
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

module.exports = {
    createNewRoles, getAllRoles, deleteRoles, updateRoles, getRoleByGroup, assignRoleToGroup
}