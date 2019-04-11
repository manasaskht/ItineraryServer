module.exports = {


    friendlyName: 'FetchProfile',


    description: 'Fetch user profile details.',


    exits: {
        success: {
            statusCode: 200,
            description: 'Success'
        },
        invalidToken: {
            statusCode: 400,
            description: 'Invalid user or token'
        }

    },


    fn: async function (inputs, exits) {
        let user = this.req.me;
        if (!user) {
            return exits.invalidToken({ message: 'Invalid user or token.' });
        } else {

            return exits.success(user);
        }

        return;
    }


};
