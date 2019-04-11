module.exports = {
    friendlyName: "Activate",

    description: "Activate account.",

    inputs: {
        userId: {
            type: "string",
            description: "user id",
            required: true
        },
        token: {
            type: "string",
            description: "activation token",
            required: true
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: ""
        },
        invalidToken: {
            statusCode: 400,
            description: "Invalid user or token"
        }
    },

    fn: async function (inputs, exits) {
        let user = await User.findOne({ id: inputs.userId });
        if (!user) {
            return exits.invalidToken({ msg: "Invalid user or token." });
        } else {
            let currentTime = new Date().getTime();
            if (user.emailStatus === "confirmed") {
                return exits.invalidToken({ msg: "User already active." });
            }

            if (user.emailVerifyExpireTime < currentTime) {
                return exits.invalidToken({
                    msg: "Token has expired. Please register again."
                });
            } else {
                if (inputs.token === user.emailVerifyCode) {
                    await User.update({ id: inputs.userId }).set({
                        emailStatus: "confirmed"
                    });
                    return exits.success({ msg: "User activated please login." });
                } else {
                    return exits.invalidToken({ msg: "Invalid user or token." });
                }
            }
        }

        return;
    }
};
