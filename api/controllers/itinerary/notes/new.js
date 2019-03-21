module.exports = {


    friendlyName: 'New',


    description: 'New note.',


    inputs: {
        title: {
            type: 'string',
            description: 'title of the note',
            required: true
        },
        description: {
            type: 'string',
            description: 'discription of note',
            required: true
        },
        itineraryId: {
            type: 'string',
            description: 'itinerary to which this note belongs to',
            required: true
        },

    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Item created'
        },
    },


    fn: async function (inputs, exits) {
        let note = await Notes.create({
            noteTitle: inputs.title,
            noteText: inputs.description,
            itinerary: inputs.itineraryId,
            username: this.req.me.firstName,
            creator: this.req.me.id
        }).fetch();
        return exits.success({ note, message: 'Note successfully addeded.' });
    }


};
