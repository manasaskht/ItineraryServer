module.exports = {


    friendlyName: 'Create random string',


    description: '',


    inputs: {
        size: {
            type: 'number',
            required: true
        }
    },


    exits: {

        success: {
            description: 'All done.',
        },

    },


    fn: async function (inputs, exits) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < inputs.size; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return exits.success(text);
    }


};

