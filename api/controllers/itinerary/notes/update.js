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
        noteId: {
            type: 'string',
            description: 'unique id of the note',
            required: true
        },

    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Note updated'
        },
    },


    fn: async function (inputs, exits) {
        let note = await Notes.updateOne({
            id: inputs.noteId
        }).set({
            noteTitle: inputs.title,
            noteText: inputs.description,
            username: this.req.me.firstName,
            creator: this.req.me.id
        });

        let group = await Groups.findOne({ itinerary: note.itinerary }).populate('members');
        note.action = 'update';
        for (let i = 0; i < group.members.length; i++) {
            let member = group.members[i];
            if (member.id !== this.req.me.id)
                sails.sockets.broadcast(member.socketId, 'note', note);
        }
        return exits.success({ note, message: 'Note successfully updated.' });
    }


};
