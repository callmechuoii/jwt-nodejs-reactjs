import mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});



const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;


    connection.query(
        ' INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password],
        function (err, result, fields) {
            if (err) {
                console.log(err);
            }
            console.log(result);
        }
    );
    return res.send("handleCreateNewUser");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}