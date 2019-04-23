module.exports = {


    friendlyName: 'Edit',


    description: 'Edit item.',


    inputs: {
        itemId: {
            type: 'string',
            required: true
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        category: {
            type: 'string',
            required: true
        },
        location: {
            type: 'string'
        },
        locationLatLng: {
            type: 'string'
        },
        dateTime: {
            type: 'number',
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
            description: 'Invalid user editing item'
        },
        noUpdates: {
            statusCode: 400,
            description: 'Invalid user editing item'
        }
    },
    fn: async function (inputs, exits) {
        if (!inputs.title && !inputs.description) {
            return exits.noUpdates({ message: 'No changes made.' })
        }
        let updates = _.pick({
            title: inputs.title,
            description: inputs.description,
            category: inputs.category,
            location: inputs.location,
            dateTime: inputs.dateTime,
            locationLatLng: inputs.locationLatLng
        }, _.identity);

        let itineraryItem = await ItineraryItems.findOne({ id: inputs.itemId }).populate('itinerary');

        let group = await Groups.findOne({ itinerary: itineraryItem.itinerary.id }).populate('members');
        if (_.isEmpty(updates)) {
            return exits.noUpdates({ message: 'No changes made.' })
        } else if (group.members.findIndex(d => d.id === this.req.me.id) > -1) {
            let updatedItem = await ItineraryItems.updateOne({ id: inputs.itemId }).set(updates);
            // update using sockets
            for (let i = 0; i < group.members.length; i++) {
                let member = group.members[i];
                updatedItem.action = 'update';
                if (member.id !== this.req.me.id)
                    sails.sockets.broadcast(member.socketId, 'timeline', updatedItem);
            }

            // respond to request
            return exits.success({ message: 'Edited itinerary item.' })
        }

        return exits.invalidUser({ message: 'Unable to edit itinerary item.' });
    }


};
