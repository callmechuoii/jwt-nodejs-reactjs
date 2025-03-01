import db from "../models/index"

const getGroups = async () => {
    try {
        let data = await db.Group.findAll(
            {
                attributes: ["id", "name", "description"],
                order: [["name", 'ASC']]
            }
        );
        return {
            EM: 'Get groups successfully',
            EC: 0,
            DT: data,
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'Error while getting group',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getGroups,
}