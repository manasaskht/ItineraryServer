module.exports = {


    friendlyName: 'List',


    description: 'List item.',


    inputs: {
        itineraryId: {
            type: 'string',
            description: 'itinerary to which this item belong',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Found itineraries are listed'
        },
        error: {
            statusCode: 400,
            description: 'Incorrect usage'
        }
    },


    fn: async function (inputs, exits) {
        let isUsersItinerary = await Itineraries.find({ id: inputs.itineraryId, creator: this.req.me.id });
        if (isUsersItinerary) {
            let itineraryItems = await ItineraryItems.find({ itinerary: inputs.itineraryId });
            return exits.success(itineraryItems);
        } else {
            return exits.error({ message: 'Invalid itinerary requested.' })
        }
    }


};
