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
        let group = await Groups.findOne({ itinerary: inputs.itineraryId });
        await Chat.create({
            message: inputs.message,
            sender: this.req.me.id,
            group: group.id
        });
        return exits.success({});
    }


};
