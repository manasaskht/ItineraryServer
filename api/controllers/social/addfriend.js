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

    // Check if the email id is user's own email id
    if(inputs.emailId != this.req.me.emailAddress) {
      let addedUser = await User.findOne ({
        emailAddress: inputs.emailId
      });
      // Check if the user exists
      if (!addedUser) {
        return exits.userNotFound({message: 'User Not Found'});
      }
      else {
        // Check if the friend has already been added to the database
        let existingFriend = await Friends.findOne({ user: this.req.me.id, friend: addedUser.id})
        if (existingFriend) {
          return exits.friendAlreadyExists({ message: "Friend already exists"})
        }
        else {
          // Add friend to the database
          await Friends.create({
            user: this.req.me.id,
            friend: addedUser.id
          });
          return exits.success({message: 'Friend Added'});
        }
      }
    }
    else {
      return exits.selfAddition({message: 'Can not add yourself'});
    }

  }


};
