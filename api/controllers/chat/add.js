module.exports = {


    friendlyName: 'Add',


    description: 'Add to chat.',


    inputs: {
        friendId: {
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
            description: 'Friend Added to chat'
        },
        selfAddition: {
            statusCode: 400,
            description: 'You are already added to chat'
        },
        friendAlreadyExists: {
            statusCode: 409,
            description: 'Friend already present in chat'
        }
    },


    fn: async function (inputs, exits) {

        // Check if the email id is user's own email id
        if (inputs.friendId != this.req.me.id) {
            let addedUser = await User.findOne({
                id: inputs.friendId
            });
            let itineraries = User.findOne({ id: addedUser.id }).populate('maintain');
            let existing = false;
            if (!itineraries.maintain) {
                existing = false
            }
            else {
                // Check if already added to itinerary
                itineraries.maintain.array.forEach(element => {
                    if (element.id == inputs.itineraryId) {
                        existing = true;
                    }
                });
            }
            if (!existing) {
                await User.addToCollection(addedUser.id, 'maintain', inputs.itineraryId);
                return exits.success({ message: 'Friend added to itinerary' });
            }
            else {
                return exits.friendAlreadyExists({ message: 'Friend already added to itinerary' });
            }
        }
        else {
            return exits.selfAddition({ message: 'You are already added to itinerary' });
        }

    }


};
