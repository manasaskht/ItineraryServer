const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require('crypto');

module.exports = {


    friendlyName: 'Login',


    description: 'Login account.',


    inputs: {
        email: {
            type: 'string',
            description: 'email of the user',
            required: true
        },
        password: {
            type: 'string',
            description: 'password in simple format',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Login Success'
        },
        userNotFound: {
            statusCode: 401,
            description: 'Unauthorized User'
        }
    },

    fn: async function (inputs, exits) {
        let hash = crypto.createHash('sha512');
        hash.update(inputs.password);
        let hashedPwd = hash.digest('hex');
        let loginUser = await User.findOne({
            emailAddress: inputs.email,
            password: hashedPwd
        });
        if (loginUser && loginUser.emailStatus === 'confirmed') {
            // let privateKey = fs.readFileSync(sails.config.appPath + '/config/jwt-secret/dev.key', 'utf-8')
            delete loginUser['password'];
            let payload = {
                userId: loginUser.id
            };
            let jwtToken = jwt.sign(payload, sails.config.session.secret, { expiresIn: '24h' });
            return exits.success({
                token: jwtToken,
                id: loginUser.id,
                firstName: loginUser.firstName,
                lastName: loginUser.lastName,
                email: loginUser.emailAddress
            });
        } else {
            return exits.userNotFound({ message: 'Login Email or Password Invalid.' });
        }
    }
};
