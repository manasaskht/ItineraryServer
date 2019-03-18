const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
                return exits.alreadyExists({ message: 'User already exists.' });
            }

            let finalUser = null;
            if (Array.isArray(createdUser)) {
                finalUser = createdUser[0];
            } else {
                finalUser = createdUser;
            }

            //Send email
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'test.itinerary.gmail.com',
                    pass: '!t!n3r@ry'
                }
            });

            const mailOptions = {
                from: 'test.titinerary@gmail.com', // sender address
                to: finalUser.emailAddress, // list of receivers
                subject: 'Welcome to Itinerary Builder', // Subject line
                html: `<h2>Hi, ${finalUser.firstName}</h2><p>To activate your account click on http://localhost:1337/account/activate?userId=${finalUser.id}&token=${emailToken} .</p>` // plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log('error in sending mail', err)
                else
                    console.log('mail sent sucessfully', info);
            });

            console.log(`Email Token for ${finalUser.emailAddress}: ${emailToken} and id is ${finalUser.id}`);
            console.log(`Link is http://localhost:1337/account/activate?userId=${finalUser.id}&token=${emailToken}`);
            return exits.success({ message: 'User successfully created. Please verify email to activate.' });
        } else {
            console.log('Unable to create user on database');
            return;
        }
    }
};
