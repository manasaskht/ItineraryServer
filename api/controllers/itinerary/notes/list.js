module.exports = {


    friendlyName: 'List',


    description: 'List notes.',


    inputs: {
        itineraryId: {
            type: 'string',
            description: 'itinerary to which these notes belong to',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Found Notes are listed'
        },
        error: {
            statusCode: 400,
            description: 'Incorrect usage'
        }
    },


    fn: async function (inputs, exits) {
        let isUsersNotes = await Notes.find({ id: inputs.itineraryId, creator: this.req.me.id });
        if (isUsersNotes) {
            let notes = await Notes.find({ itinerary: inputs.itineraryId });
            return exits.success(notes);
        } else {
            return exits.error({ message: 'Notes not found' })
        }
    }


};
