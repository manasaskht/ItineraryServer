module.exports = {


  friendlyName: 'Creategroup',


  description: 'Creategroup social.',


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

    let group = await Groups.findOne({
      itinerary: inputs.id
    })
    if (!group) {
      group = await Groups.create({
        name: inputs.title,
        itinerary: inputs.id
      }).fetch();
      await Groups.addToCollection(group.id, 'members', this.req.me.id);
    }
    else {
      return exits.groupAlreadyExists({});
    }
    return;

  }


};
