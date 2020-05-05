const jwt = require('jsonwebtoken');
// ====================
// Verificar Token
// ====================
let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.user = decoded.user;
        next();
    });
};
// ====================
// Verifica AdminRole
// ====================
let verifyAdminRole = (req, res, next) => {
    let user = req.user;
    console.log(user);
    if (req.user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'No tienes permisos para hacer esto'
            }
        })
    }
    next();

};
module.exports = {
    verifyToken,
    verifyAdminRole
};