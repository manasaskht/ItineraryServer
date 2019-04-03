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

        let i = 0;
        while (i < memberGroups.belongTo.length) {
            let rawMembers = await Groups.findOne({ id: memberGroups.belongTo[i].id }).populate('members');
            if (allGroups.findIndex(group => group.title === memberGroups.belongTo[i].name) < 0) {
                allGroups.push({ title: memberGroups.belongTo[i].name, members: rawMembers.members });
            }
            i++;
        }
        return exits.success(allGroups);

    }


};
