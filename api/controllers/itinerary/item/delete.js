module.exports = {


    friendlyName: 'Delete',


    description: 'Delete item.',


    inputs: {
        itineraryId: {
            type: 'string',
            required: true
        },
        itemId: {
            type: 'string',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Itinerary Item destroyed'
        },
        invalidUser: {
            statusCode: 400,
            description: 'Invalid user deleting item'
        }
    },


    fn: async function (inputs, exits) {
        // find itinerary, if user is friend in itinerary or user created itinerary he can delete items.
        // use itemid to delete item in timeline.
        let group = await Groups.findOne({ itinerary: inputs.itineraryId }).populate('members');
        let destroyedObj = null;
        if (group.members.findIndex(d => d.id === this.req.me.id) > -1) {
            destroyedObj = await ItineraryItems.destroyOne({ id: inputs.itemId });

            // update using sockets
            for (let i = 0; i < group.members.length; i++) {
                let member = group.members[i];
                destroyedObj.action = 'delete';
                if (member.id !== this.req.me.id)
                    sails.sockets.broadcast(member.socketId, 'timeline', destroyedObj);
            }

            // respond
            return exits.success({ message: 'Deleted itinerary item.' })
        }
        return exits.invalidUser({ message: 'Unable to delete itinerary item.' });
    }
};
