import express from 'express';
import homeController from '../controller/homeController.js';
import apiController from '../controller/apiController.js';
import userController from '../controller/userController.js';
import groupController from '../controller/groupController.js';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction.js';
import roleController from '../controller/roleController.js';
const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */

const checkUser = (req, res, next) => {
    const nonSecurePaths = ['/', '/register', '/login'];
    if (nonSecurePaths.includes(req.path)) return next();
    if (user) {
        next();
    } else {

    }

}

const initApiRoutes = (app) => {


    router.all('*', checkUserJWT, checkUserPermission);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    router.get("/account", userController.getUserAccount);

    //user routes
    router.get("/user/read", userController.readFunc);
    router.post('/user/create', userController.createFunc);
    router.put('/user/update', userController.updateFunc);
    router.delete('/user/delete', userController.deleteFunc);


    //group routes
    router.get("/group/read", groupController.readFunc);

    //roles routes
    router.get("/role/read", roleController.readFunc);
    router.post('/role/create', roleController.createFunc);
    router.put('/role/update', roleController.updateFunc);
    router.delete('/role/delete', roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
    router.post("/role/assign-to-group", roleController.assignRoleToGroup);






    return app.use("/api/v1", router);
}


export default initApiRoutes;
