import roleAPIService from '../service/roleAPIService';
const createFunc = async (req, res) => {
    try {
        let data = await roleAPIService.createNewRoles(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' // data
        })
    }
}
const readFunc = async (req, res) => {
    try {
        let data = await roleAPIService.getAllRoles();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' // data
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        let data = await roleAPIService.updateRoles(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' // data
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await roleAPIService.deleteRoles(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' // data
        })
    }
}

const getRoleByGroup = async (req, res) => {
    try {
        let id = req.params.groupId;
        let data = await roleAPIService.getRoleByGroup(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' // data
        })
    }
}

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleAPIService.assignRoleToGroup(req.body.data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' // data
        })
    }
}

module.exports = {
    createFunc, readFunc, updateFunc, deleteFunc, getRoleByGroup, assignRoleToGroup
}