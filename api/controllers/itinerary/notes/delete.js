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
        let note = await Notes.destroyOne({ id: inputs._id });

        // Update on socket
        let group = await Groups.findOne({ itinerary: note.itinerary }).populate('members');
        note.action = 'delete';
        for (let i = 0; i < group.members.length; i++) {
            let member = group.members[i];
            if (member.id !== this.req.me.id)
                sails.sockets.broadcast(member.socketId, 'note', note);
        }

        // Respond to current request
        if (note) {
            return exits.success({ message: 'Note successfully deleted' });
        } else {
            return exits.error({ message: 'Note not found' })
        }
    }


};
