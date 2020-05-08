// const bcrypt = require('bcryptjs');
// const userModel = require('../users/user-model');
module.exports =()=>{
    return async (req, res, next)=>{
        if (!req.session || !req.session.user) {
            res.status(401).json({
                message: "Invalid credentials, Sir/Miss"
            });
        }
        next();
    }
}
