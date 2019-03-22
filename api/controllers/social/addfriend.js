module.exports = {


  friendlyName: 'Add friend',


  description: 'Add a new person to the friends list',


  inputs: {
    emailId: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Friend Added'
    },
    selfAddition: {
      statusCode: 400,
      description: 'Cannot add yourself as a friend'
    },
    userNotFound: {
      statusCode: 404,
      description: 'User not found in the database'
    },
    friendAlreadyExists: {
      statusCode: 409,
      description: 'Friend already present in the friends list'
    }
  },


  fn: async function (inputs,exits) {

    if(inputs.emailId != this.req.me.emailAddress) {
      let addedUser = await User.findOne ({
        emailAddress: inputs.emailId
      });
      if (!addedUser) {
        return exits.userNotFound();
      }
      else {
        // if (await Friends.find({ userId: this.req.me.emailAddress }).populate('user')) {
          let existingFriend = await Friends.findOne({ user: this.req.me.id, friend: addedUser.id})
          if (existingFriend) {
            return exits.friendAlreadyExists({ message: "Friend already exists"})
          }
          else {
            let status = await Friends.create({
              user: this.req.me.id,
              friend: addedUser.id
            });
          }
          // if (status) {
            return exits.success();
          // }
        // }
      }
    }
    else {
      return exits.selfAddition();
    }

  }


};
