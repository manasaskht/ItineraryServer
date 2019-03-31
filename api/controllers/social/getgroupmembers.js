module.exports = {


    friendlyName: 'Getgroupmembers',


    description: 'Getgroupmembers social.',


    inputs: {
        groupName: {
            type: 'string',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Found members are listed'
        }
    },


    fn: async function (inputs, exits) {

        let memberObjs = await Groups.findOne({ name: inputs.groupName }).populate('members');
        if (!memberObjs.members) {
            return;
        } else {
            return exits.success(memberObjs.members);
        }
    }


};
