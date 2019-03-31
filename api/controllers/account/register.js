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
            let transporter = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: 'nikhltyagi',
                    pass: 'mynewS3ndGr!d'
                }
            });

            let clientServer = sails.config.custom.clientServer;
            const mailOptions = {
                from: 'noreply@itineraryplanner.com', // sender address
                to: finalUser.emailAddress, // list of receivers
                subject: 'Welcome to Itinerary Builder', // Subject line
                html: `
                Hi <b>${finalUser.firstName}</b>,
                <p>
                Welcome to Itinerary Planner. Following are the the things you can do to make your trip more enjoyable.
                <ul>
                    <li>Create group itineraries</li>
                    <li>Visualize them in on a map</li>
                    <li>Create timeline, notes.</li>
                    <li>Chat with your friends.</li>
                </ul>
                And much more...
                </p>
                <p>To activate your account click on <a href="http://localhost:1337/account/activate?userId=${finalUser.id}&token=${emailToken}">link</a> .</p>
                Thanks<br>
                Team Itinerary Planner
                ` // plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log('error in sending mail', err)
                else
                    console.log('mail sent sucessfully', info);
            });
            // End send email

            // console.log(`Email Token for ${finalUser.emailAddress}: ${emailToken} and id is ${finalUser.id}`);
            // console.log(`Link is http://localhost:1337/account/activate?userId=${finalUser.id}&token=${emailToken}`);
            return exits.success({ message: 'User successfully created. Please verify email to activate.' });
        } else {
            console.log('Unable to create user on database');
            return;
        }
    }
};
