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
        let isUsersItinerary = await Itineraries.findOne({ id: inputs.itineraryId }).populate('usergroup', { id: this.req.me.id });
        isUsersItinerary = isUsersItinerary.creator === this.req.me.id || isUsersItinerary.usergroup.findIndex(d => d.id === this.req.me.id) > -1;
        if (isUsersItinerary) {
            let itineraryItems = await ItineraryItems.find({ itinerary: inputs.itineraryId }).sort([{ dateTime: 'ASC' }]);
            return exits.success(itineraryItems);
        } else {
            return exits.error({ message: 'Invalid itinerary requested.' })
        }
    }


};
