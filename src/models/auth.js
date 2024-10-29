const pool = require('../utils/mysql.connect.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { KEY } = require('../global/_var.js');

const verifyUser = async ({ email, password }) => {
    try {
        let msg = {
            status: false,
            message: 'User not found',
            code: 404
        };

        const connection = await pool.getConnection();

        const sqlUser = 'SELECT cedula_rif, nombre, email, tipo_aliado, telefono, direccion, comision, password FROM aliados WHERE email = ?';
        const [users] = await connection.execute(sqlUser, [email]);

        if (users.length > 0) {
            const user = users[0];

            // Verificar la contraseña utilizando bcrypt.compare
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const currentDate = new Date();
                const dateCreated = currentDate.toISOString().split('T')[0];
                const dateExpires = new Date(currentDate.setDate(currentDate.getDate() + 7)).toISOString().split('T')[0];

                let tokenInfo = {
                    cedula_rif: user.cedula_rif,
                    nombre: user.nombre,
                    email: user.email,
                    telefono: user.telefono,
                    date_created: dateCreated,
                    date_expires: dateExpires
                };

                const token = jwt.sign(tokenInfo, KEY, { algorithm: 'HS256' });

                msg = {
                    status: true,
                    message: 'Successful login',
                    code: 200,
                    token: token
                };
            } else {
                msg = {
                    status: false,
                    message: 'Incorrect password',
                    code: 401
                };
            }
        }

        connection.release();
        return msg;

    } catch (err) {
        return {
            status: false,
            message: 'Server error',
            code: 500,
            error: err
        };
    }
};

module.exports = {
    verifyUser
};
