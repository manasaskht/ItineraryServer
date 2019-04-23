module.exports = {


    friendlyName: 'New',


    description: 'New item.',


    inputs: {
        title: {
            type: 'string',
            description: 'title of the item',
            required: true
        },
        description: {
            type: 'string',
            description: 'discription of item',
            required: true
        },
        itineraryId: {
            type: 'string',
            description: 'itinerary to which this item belong',
            required: true
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
            description: 'Item created'
        },
        userIncorrect: {
            statusCode: 400,
            description: 'Incorrect user editing itinerary'
        }
    },


    fn: async function (inputs, exits) {
        let group = await Groups.findOne({ itinerary: inputs.itineraryId }).populate('members');
        if (group.members.findIndex(d => d.id === this.req.me.id) > -1) {
            let itemVals = {
                title: inputs.title,
                description: inputs.description,
                itinerary: inputs.itineraryId,
                category: inputs.category,
                location: inputs.location,
                dateTime: inputs.dateTime,
                locationLatLng: inputs.locationLatLng
            };
            itemVals = _.pick(itemVals, _.identity);
            let itineraryItem = await ItineraryItems.create(itemVals).fetch();

            for (let i = 0; i < group.members.length; i++) {
                let member = group.members[i];
                if (member.id !== this.req.me.id)
                    sails.sockets.broadcast(member.socketId, 'timeline', itineraryItem);
            }

            return exits.success({ itineraryItem, message: 'Item successfully created.' });
        } else {
            return exits.userIncorrect({ message: 'You don\'t have access to this itinerary.' });
        }
    }


};
