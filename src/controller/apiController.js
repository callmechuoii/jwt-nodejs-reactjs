import loginRegisterService from '../service/loginRegisterService';
const testAPI = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: '1',
                DT: ''
            })
        }

        if (!req.body.password && req.body.password.lenght < 6) {
            return res.status(200).json({
                EM: 'Password must be at least 6 characters long',
                EC: '1',
                DT: ''
            })
        }

        //service create user
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '' // data
        })
    }
}


const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        //Set Cookies
        if (data && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }
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

const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt"); // delete the cookie
        return res.status(200).json({
            EM: 'clear cookies',
            EC: 0,
            DT: ''
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
    testAPI, handleRegister, handleLogin, handleLogout
}