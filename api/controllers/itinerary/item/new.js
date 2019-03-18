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
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Item created'
        },
    },


    fn: async function (inputs, exits) {
        let itineraryItem = await ItineraryItems.create({
            title: inputs.title,
            description: inputs.description,
            itinerary: inputs.itineraryId
        }).fetch();
        return exits.success({ itineraryItem, message: 'Item successfully created.' });
    }


};
