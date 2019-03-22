module.exports = {


  friendlyName: 'Get Friends',


  description: 'Get all the friends for a user',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Found friends are listed'
    }
  },


  fn: async function (inputs, exits) {

    let searchParams = { user: this.req.me.id };
    let friendIds = await Friends.find(searchParams);
    let friends = [];
    for(let i = 0; i < friendIds.length; i++) {
      let friend = await User.findOne({ id: friendIds[i].friend });
      friends.push(friend);
    }
    return exits.success(friends);

  }


};
