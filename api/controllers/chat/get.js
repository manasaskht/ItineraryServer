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
        let messages = await Chat.find({ group: group.id }).sort('createdAt DESC');
        for (i = 0; i < messages.length; i += 1) {
            let user = await User.findOne({ id: messages[i].sender });
            messages[i].senderName = user.firstName + ' ' + user.lastName;
        }
        return exits.success(messages);
    }


};
