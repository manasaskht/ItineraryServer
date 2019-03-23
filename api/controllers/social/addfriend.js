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
        return exits.userNotFound({message: 'User Not Found'});
      }
      else {
        let existingFriend = await Friends.findOne({ user: this.req.me.id, friend: addedUser.id})
        if (existingFriend) {
          return exits.friendAlreadyExists({ message: "Friend already exists"})
        }
        else {
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
