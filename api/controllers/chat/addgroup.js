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

        let members = await Groups.findOne({ name: inputs.groupName }).populate('members');
        let addedMembers = await Itineraries.findOne({ id: inputs.itineraryId }).populate('usergroup');
        for (i = 0; i < members.members.length; i += 1) {
            if (addedMembers.usergroup.length === 0) {
                await User.addToCollection(members.members[i].id, 'maintain', inputs.itineraryId);
            } else if (addedMembers.usergroup.findIndex(group => group.id === members.members[i].id) >= 0) {
                await User.addToCollection(members.members[i].id, 'maintain', inputs.itineraryId);
            }
        }
        return exits.success({ message: 'Group Added to chat' });

    }


};
