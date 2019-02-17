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
        delete loginUser['password'];
        if (loginUser && loginUser.emailStatus === 'confirmed') {
            // let privateKey = fs.readFileSync(sails.config.appPath + '/config/jwt-secret/dev.key', 'utf-8')
            let payload = {
                userId: loginUser._id
            };
            let jwtToken = jwt.sign(payload, sails.config.session.secret, { expiresIn: '24h' });
            return exits.success(Object.assign(loginUser, {
                token: jwtToken
            }));
        } else {
            return exits.userNotFound({ message: 'Login User or Password Invalid.' });
        }
    }
};
