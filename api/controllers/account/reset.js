const jwt = require('jsonwebtoken');
const crypto = require('crypto');
module.exports = {


    friendlyName: 'Reset',


    description: 'Reset account password.',


    inputs: {
        password: {
            required: true,
            type: 'string'
        },
        confirmPwd: {
            required: true,
            type: 'string'
        },
        token: {
            required: true,
            type: 'string'
        }
    },


    exits: {
        success: {
            statusCode: 200
        },
        inputError: {
            statusCode: 400
        }
    },


    fn: async function (inputs, exits) {
        if (jwt.verify(inputs.token, sails.config.session.secret)) {
            if (inputs.password === inputs.confirmPwd) {
                let payload = jwt.decode(inputs.token);
                let hash = crypto.createHash('sha512');
                hash.update(inputs.password);
                let newPwd = {
                    password: hash.digest('hex')
                };
                try {
                    let updatedUser = await User.update({ id: payload.userId }).set(newPwd).fetch();
                    return exits.success({ message: 'Password successfully changed' });
                } catch (err) {
                    return exits.inputError({ message: err.message });
                }
            } else {
                return exits.inputError();
            }
        } else {
            return exits.inputError();
        }

    }
};
