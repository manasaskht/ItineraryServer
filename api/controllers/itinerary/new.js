module.exports = {
    friendlyName: 'New',

    description: 'New itinerary.',

    inputs: {
        title: {
            type: 'string',
            description: 'title of the trip',
            required: true
        },
        description: {
            type: 'string',
            description: 'little bit about the trip',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Itinerary created'
        },
    },

    fn: async function (inputs, exits) {
        let itinerary = await Itineraries.create({
            title: inputs.title,
            description: inputs.description,
            creator: this.req.me.id
        }).fetch();
        return exits.success({ itinerary, message: 'Itinerary successfully created.' });
    }
};
