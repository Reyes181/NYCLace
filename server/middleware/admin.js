let admin = (req,res,next) => {
    if(req.user.role === 0){
        return res.send('Access not permited for user role.');
    }
    next();
};

module.exports = admin;