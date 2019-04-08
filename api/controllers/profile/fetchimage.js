module.exports = {


    friendlyName: 'Fetchimage',


    description: 'Fetchimage profile.',


    inputs: {

    },


    exits: {
        photoNotFound: {
            statusCode: 400
        }
    },


    fn: async function (inputs, exits) {
        let user = this.req.me;
        if (user['userPhotoURL']) {
            this.res.sendFile(user['userPhotoURL']);
        } else {
            exits.photoNotFound({});
        }
    }


};
