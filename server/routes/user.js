const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const saltRound = 10;
const User = require('../models/user');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');
const app = express();
app.get('/usuario', verifyToken, (req, res) => {
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    User.find({ status: true }, 'name email role status')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    total: count
                });
            });
        });
});

app.post('/usuario', [verifyToken, verifyAdminRole], (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRound),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        userDB.password = null;
        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.put('/usuario/:id', [verifyToken, verifyAdminRole], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });

});

app.delete('/usuario/:id', [verifyToken, verifyAdminRole], (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, { status: false }, {}, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

module.exports = app;