module.exports = {


    friendlyName: 'Getgroups',


    description: 'Get Groups for a user',


    inputs: {
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Found groups are listed'
        }
    },


    fn: async function (inputs, exits) {
        // Get a list of groups for the current user
        let memberGroups = await User.findOne({ id: this.req.me.id }).populate('belongTo');
        let allGroups = [];

        // Add each groups information to a collection and return it
        // memberGroups.belongTo.forEach(element => {
        //     allGroups.push({ title: element.name, members: element.members });
        // });

        for (i = 0; i < memberGroups.belongTo.length; i += 1) {
            let rawMembers = await Groups.findOne({ id: memberGroups.belongTo[i].id }).populate('members');
            allGroups.push({ title: memberGroups.belongTo[i].name, members: rawMembers.members });
        }
        return exits.success(allGroups);

    }


};
