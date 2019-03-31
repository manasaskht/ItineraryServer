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
        // let searchParams = { creator: this.req.me.id };
        let searchParams = {};
        Object.assign(searchParams, inputs['itineraryId'] ? { id: inputs.itineraryId } : {});
        let allItineraries = await Itineraries.find(searchParams).populate('usergroup', { id: this.req.me.id });
        let itineraries = allItineraries.filter(d => (d.creator === this.req.me.id) || (d.usergroup.findIndex(d => d.id === this.req.me.id) > -1));
        return exits.success(itineraries);
    }


};
