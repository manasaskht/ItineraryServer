module.exports = {


    friendlyName: 'Addgroup',


    description: 'Addgroup chat.',


    inputs: {
        groupName: {
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
            description: 'Group Added to chat'
        }
    },


    fn: async function (inputs, exits) {

        let members = Groups.findOne({ name: inputs.groupName }).populate('members');
        let addedMembers = Itineraries.findOne({ id: inputs.itineraryId }).populate('usergroup');
        for (i = 0; i < members.members.length; i += 1) {
            if (!addedMembers.findOne({ id: element.id })) {
                await User.addToCollection(element.id, 'maintain', inputs.itineraryId);
            }
        }
        return exits.success({ message: 'Group Added to chat' });

    }


};
