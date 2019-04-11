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
        let isUsersItinerary = await Itineraries.findOne({ id: inputs.itineraryId }).populate('usergroup', { id: this.req.me.id });
        isUsersItinerary = isUsersItinerary.creator === this.req.me.id || isUsersItinerary.usergroup.findIndex(d => d.id === this.req.me.id) > -1;
        // let itinerary = await Itineraries.findOne({ id: inputs.itineraryId }).populate('creator');
        let destroyedObj = null;
        if (isUsersItinerary) {
            destroyedObj = await ItineraryItems.destroyOne({ id: inputs.itemId });
            return exits.success({ message: 'Deleted itinerary item.' })
        }
        return exits.invalidUser({ message: 'Unable to delete itinerary item.' });
    }
};
