module.exports = {


    friendlyName: 'Get',


    description: 'Get chat.',


    inputs: {
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
        let group = await Groups.findOne({ itinerary: inputs.itineraryId });
        if (!group) {
            return;
        }
        let messages = await Chat.find({ group: group.id }).populate('sender').sort('createdAt DESC');

        for (let i = 0; i < messages.length; i += 1) {
            messages[i].senderName = messages[i].sender.firstName + ' ' + messages[i].sender.lastName;
            messages[i].sender = messages[i].sender.id;
            // let user = await User.findOne({ id: messages[i].sender });
            // messages[i].senderName = user.firstName + ' ' + user.lastName;
        }
        return exits.success(messages);
    }


};
