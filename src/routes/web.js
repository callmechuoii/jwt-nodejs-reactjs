import express from 'express';
import homeController from '../controller/homeController.js';
import apiController from '../controller/apiController.js';
const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld);
    router.get('/user', homeController.handleUserPage);
    router.post("/user/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/user/update-user", homeController.handleUpdateUser);

    router.get("/api/test-api", apiController.testAPI);


    return app.use("/", router);
}


export default initWebRoutes;
