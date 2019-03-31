module.exports = {


    friendlyName: 'Removemember',


    description: 'Removemember social.',


    inputs: {
        itineraryId: {
            type: 'string',
            required: true
        },
        friendId: {
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

        await User.removeFromCollection(this.req.me.id, 'maintain').members(inputs.itineraryId);
        let group = await Groups.findOne({ itinerary: inputs.itineraryId });
        await User.removeFromCollection(inputs.friendId, 'belongTo').members(group.id);
        return exits.success({ message: 'Friend Removed from itinerary' });

    }


};
