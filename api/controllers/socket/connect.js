module.exports = {


    friendlyName: 'Connect',


    description: 'Connect socket.',


    inputs: {

    },


    exits: {
        success: {
            responseCode: 200,
            description: 'connected'
        },
        badRequest: {
            responseCode: 400,
            description: 'Not socket request.'
        }
    },


    fn: async function (inputs, exits) {
        if (this.req.isSocket) {
            let socketId = sails.sockets.getId(this.req)
            await User.update({ id: this.req.me.id }).set({
                socketId
            });
            return exits.success({ message: 'connected' });
        } else {
            return exits.badRequest({ message: 'Only socket requests allowed.' });
        }
    }


};
