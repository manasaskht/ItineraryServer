module.exports = {


    friendlyName: 'Delete Note',


    description: 'Delete notes.',


    inputs: {
        _id: {
            type: 'string',
            description: 'unique id for each note',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Note successfully deleted'
        },
        error: {
            statusCode: 400,
            description: 'Note not found'
        }
    },


    fn: async function (inputs, exits) {
        let isNoteDeleted = await Notes.destroyOne({ id: inputs._id })
        if (isNoteDeleted) {
            return exits.success({ message: 'Note successfully deleted' });
        } else {
            return exits.error({ message: 'Note not found' })
        }
    }


};
