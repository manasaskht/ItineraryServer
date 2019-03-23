module.exports = {


  friendlyName: 'Deletefriend',


  description: 'Delete a friend.',


  inputs: {
    id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Friend deleted successfully'
    }
  },


  fn: async function (inputs, exits) {

    let status = await Friends.destroy({ user: this.req.me.id, friend: inputs.id}).fetch();
    return exits.success({ message: 'Friend Deleted'});

  }


};
