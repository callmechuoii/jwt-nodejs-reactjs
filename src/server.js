require("dotenv").config();
import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import initApiRouters from './routes/api';
import configCors from './config/cors';
import cookieParser from 'cookie-parser';
// import connection from './config/connectDB';

const app = express();
const PORT = process.env.PORT || 8080;

//configCors
configCors(app);

//config view engine
configViewEngine(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookies parser
app.use(cookieParser());




//test connection DB
// connection();


//init web routes
initWebRoutes(app);
initApiRouters(app);



app.use((req, res) => {
    return res.send('404 Not Found');
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  // log server running message in console.log
});