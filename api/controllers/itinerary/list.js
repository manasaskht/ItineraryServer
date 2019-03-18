module.exports = {


    friendlyName: 'List',


    description: 'List itinerary.',


    inputs: {
        itineraryId: {
            type: 'string',
            description: 'Itinerary id given.'
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Found itineraries are listed'
        }
    },


    fn: async function (inputs, exits) {
        let searchParams = { creator: this.req.me.id };
        Object.assign(searchParams, inputs['itineraryId'] ? { id: inputs.itineraryId } : {});
        let itineraries = await Itineraries.find(searchParams);
        return exits.success(itineraries);
    }


};
