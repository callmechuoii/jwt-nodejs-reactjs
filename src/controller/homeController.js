import userService from '../service/userservice';
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    await userService.deleteUser(4);
    return res.render("user.ejs", { userList });
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    userService.createNewUser(email, username, password);

    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser, handleDeleteUser
}