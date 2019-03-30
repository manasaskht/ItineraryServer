module.exports = {


    friendlyName: 'Deletefriend',


    description: 'Delete a friend.',

    // Get the id of the friend to be deleted
    inputs: {
        id: {
            type: 'string',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Friend deleted successfully'
        }
    },


    fn: async function (inputs, exits) {

        // Delete the specified friend for the logged-in user
        await Friends.destroy({ user: this.req.me.id, friend: inputs.id });
        await Friends.destroy({ user: inputs.id, friend: this.req.me.id });
        return exits.success({ message: 'Friend Deleted' });

    }


};
