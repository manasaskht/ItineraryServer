module.exports = {


    friendlyName: 'Creategroup',


    description: 'Creategroup social.',


    // Get itinerary ID and Name for associating with the group
    inputs: {
        id: {
            type: 'string',
            required: true
        },
        title: {
            type: 'string',
            required: true
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Group Created'
        },
        groupAlreadyExists: {
            statusCode: 409,
            description: 'Group already exists'
        }
    },


    fn: async function (inputs, exits) {

        // Check if the group already exists
        let group = await Groups.findOne({
            itinerary: inputs.id
        })
        if (!group) {
            group = await Groups.create({
                name: inputs.title,
                itinerary: inputs.id
            }).fetch();
            // Add current user to the group
            await Groups.addToCollection(group.id, 'members', this.req.me.id);
            return exits.success({})
        }
        else {
            return exits.groupAlreadyExists({});
        }

    }


};
