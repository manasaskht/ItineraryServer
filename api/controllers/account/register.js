const crypto = require('crypto');

module.exports = {


    friendlyName: 'Register',


    description: 'Register account.',


    inputs: {
        firstName: {
            type: 'string',
            required: true
        },
        lastName: {
            type: 'string',
            required: true
        },
        emailId: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true,
            description: 'New Password of the user'
        },
        confirmPwd: {
            type: 'string',
            required: true,
            description: 'Type in the password again.'
        }
    },
    exits: {
        success: {
            statusCode: 200,
            discription: 'User created'
        },
        invalidRequest: {
            statusCode: 400,
            description: 'Password Confirm password not matching'
        }
    },

    fn: async function (inputs, exits) {
        if (inputs.password !== inputs.confirmPwd) {
            return exits.invalidRequest();
        }

        let hash = crypto.createHash('sha512');
        hash.update(inputs.password);

        let createdUser = await User.create({
            emailAddress: inputs.emailId,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            password: hash.digest('hex')
        }).fetch();

        if (createdUser) {
            delete createdUser['password']
            return exits.success(createdUser)
        } else {
            console.log('Unable to create user on database');
        }
    }


};
