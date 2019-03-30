const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {


    friendlyName: 'Forgot Password',
    description: 'Forgot password email to the registered user.',
    inputs: {
        email: {
            type: 'string',
            description: 'email of the user',
            required: true
        }
    },

    exits: {
        success: {
            statusCode: 200
        },
        userNotFound: {
            statusCode: 400,
            description: 'Invalid email entered no user found.'
        }
    },

    fn: async function (inputs, exits) {
        let resetUser = await User.findOne({
            emailAddress: inputs.email
        });
        if (resetUser) {
            let payload = {
                userId: resetUser.id
            };
            let jwtToken = jwt.sign(payload, sails.config.session.secret, { expiresIn: '5h' });
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
                to: resetUser.emailAddress, // list of receivers
                subject: 'Reset Password', // Subject line
                html: `
                Hi <b>${resetUser.firstName}</b>,
                <p>
                We have received your request to update the password to your account on the Itinerary Builder website. If you made this request, please click on the link below to reset your password:
                </p>
                
                <p>To change your password please follow <a href="http://${clientServer}/reset/${jwtToken}">RESET PASSWORD LINK</a>.</p>
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
            return exits.success({ message: 'Sent a verification link to the user.' });
        } else {
            return exits.userNotFound({ message: 'Email not registered.' });
        }
    }
};
