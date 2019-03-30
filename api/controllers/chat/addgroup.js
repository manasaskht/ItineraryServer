module.exports = {


  friendlyName: 'Addgroup',


  description: 'Addgroup chat.',


  inputs: {
    groupId: {
      type: 'string',
      required: true
    },
    itineraryId: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Group Added to chat'
    }
  },


  fn: async function (inputs) {

    let members = Groups.findOne({ id: inputs.groupId }).populate('members');
    let addedMembers = Itineraries.findOne({ id: inputs.itineraryId }).populate('usergroup');
    members.members.array.forEach(element => {
      if ( !addedMembers.findOne({ id: element.id}) ) {
        await User.addToCollection(element.id, 'maintain', inputs.itineraryId);
      }
    });
    return exits.success({ message: 'Group Added to chat'});

  }


};
