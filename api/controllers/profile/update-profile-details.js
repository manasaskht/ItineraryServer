module.exports = {


    friendlyName: 'Update profile details',

    description: '',


    inputs: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        age: {
            type: 'number'
        },
        sex: {
            type: 'string'
        },
        bio: {
            type: 'string'
        }

    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Itinerary Item destroyed'
        },
        invalidUser: {
            statusCode: 400,
            description: 'Invalid user editing item'
        },
        noUpdates: {
            statusCode: 400,
            description: 'Invalid user editing item'
        }

    },


    fn: async function (inputs, exits) {

        let updates = _.pick({
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            age: inputs.age,
            sex: inputs.sex,
            bio: inputs.bio,
        }, _.identity);

        let user = await User.findOne({ id: this.req.me.id });
        if (_.isEmpty(updates)) {
            return exits.noUpdates({ message: 'No changes made.' })
        } else {
            await User.updateOne({ id: this.req.me.id })
                .set(updates);
            return exits.success({ message: 'Edited profile.' })
        }
    }

};
