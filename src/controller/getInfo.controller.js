const { verifyUser } = require('../models/auth.js');

const controller = {};

controller.login = async (req, res) => {
    try {
        const { email, password } = req.body;
     
        const user = await verifyUser({ email, password });
  
        if (!user.status) {
            res.status(user.code).json({ error: user.message });
        } else {
            res.status(user.code).json(user);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error en el Servidor' });
    }
};

module.exports = controller;
