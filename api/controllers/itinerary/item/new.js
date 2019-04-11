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
        let isUsersItinerary = await Itineraries.findOne({ id: inputs.itineraryId }).populate('usergroup', { id: this.req.me.id });
        isUsersItinerary = isUsersItinerary.creator === this.req.me.id || isUsersItinerary.usergroup.findIndex(d => d.id === this.req.me.id) > -1;
        if (isUsersItinerary) {
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
            return exits.success({ itineraryItem, message: 'Item successfully created.' });
        } else {
            return exits.userIncorrect({ message: 'You don\'t have access to this itinerary.' });
        }
    }


};
