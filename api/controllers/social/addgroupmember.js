module.exports = {


    friendlyName: 'Addgroupmember',


    description: 'Addgroupmember social.',


    inputs: {
        friendId: {
            type: 'string',
            required: true
        },
        itineraryId: {
            type: 'string',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Friend Added'
        },
        selfAddition: {
            statusCode: 400,
            description: 'Cannot add yourself as a friend'
        },
        userNotFound: {
            statusCode: 404,
            description: 'User not found in the database'
        },
        friendAlreadyExists: {
            statusCode: 409,
            description: 'Friend already present in the friends list'
        }
    },


    fn: async function (inputs, exits) {

        if (inputs.friendId == this.req.me.id) {
            return exits.selfAddition({ message: 'You are already added' });
        }
        let group = await Groups.findOne({
            itinerary: inputs.itineraryId
        })
        // Add user to the group
        await Groups.addToCollection(group.id, 'members', inputs.friendId);
        return exits.success({});

    }


};
