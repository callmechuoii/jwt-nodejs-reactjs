import express from 'express';
import homeController from '../controller/homeController.js';

const router = express.Router();
/**
 * 
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get('/', homeController.handleHelloWorld);
    router.get('/', (req, res) => {
        return res.send('Hello, World!');
    });

    return app.use("/", router);
}


export default initWebRoutes;
