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

    let memberGroups = await User.findOne({ id: this.req.me.id}).populate('belongTo');
    let allGroups = [];
    memberGroups.belongTo.forEach(element => {
      allGroups.push({title: element.name, members: element.members});
    });
    return exits.success(allGroups);

  }


};
