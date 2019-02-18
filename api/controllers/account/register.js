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
        alreadyExists: {
            statusCode: 400,
            description: 'User already exists with this email'
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

        let emailToken = await sails.helpers.createRandomString.with({ size: 12 })

        let newUser = {
            emailAddress: inputs.emailId,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            password: hash.digest('hex'),
            emailVerifyCode: emailToken,
            emailVerifyExpireTime: (new Date()).getTime() + (30 * 60 * 1000)
        };
        let registerUser = Object.assign({}, newUser);

        let createdUser = await User.findOrCreate({
            emailAddress: inputs.emailId
        }, registerUser);

        if (createdUser) {
            let createdDelta = (new Date()).getTime() - createdUser.createdAt;
            if (createdUser.emailStatus === "unconfirmed" && createdDelta > 3000) {
                // Unconfirmed user created before 3 seconds
                createdUser = await User.update({ emailAddress: createdUser.emailAddress }).set(newUser).fetch();
            } else if (createdUser.emailStatus === "confirmed") {
                return exits.alreadyExists({ messages: 'User already exists.' });
            }

            console.log(`Email Token for ${createdUser[0].emailAddress}: ${emailToken} and id is ${createdUser[0].id}`);
            return exits.success({ message: 'User successfully created. Please verify email to activate.' });
        } else {
            console.log('Unable to create user on database');
            return;
        }
    }
};
