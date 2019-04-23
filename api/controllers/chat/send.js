module.exports = {


    friendlyName: 'Send',


    description: 'Send chat.',


    inputs: {
        message: {
            type: 'string',
            required: true
        },
        itineraryId: {
            type: 'string',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Message Sent'
        }
    },


    fn: async function (inputs, exits) {
        let group = await Groups.findOne({ itinerary: inputs.itineraryId }).populate('members');
        let chat = {
            message: inputs.message,
            sender: this.req.me.id,
            group: group.id
        };
        await Chat.create(chat);
        for (let i = 0; i < group.members.length; i++) {
            let member = group.members[i];
            chat.senderName = this.req.me.firstName + ' ' + this.req.me.lastName;
            delete chat.group;
            sails.sockets.broadcast(member.socketId, 'chat', chat);
        }
        return exits.success({});
    }


};
