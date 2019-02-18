/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

        emailAddress: {
            type: 'string',
            required: true,
            unique: true,
            isEmail: true,
            maxLength: 200,
            example: 'carol.reyna@microsoft.com'
        },

        password: {
            type: 'string',
            required: true,
            description: 'Securely hashed representation of the user\'s login password.',
            protect: true,
            example: '2$28a8eabna301089103-13948134nad'
        },

        firstName: {
            type: 'string',
            required: true,
            description: 'User\'s first name',
            maxLength: 120,
            example: 'Lily'
        },

        lastName: {
            type: 'string',
            required: true,
            description: 'User\'s last name',
            maxLength: 120,
            example: 'Dawson'
        },

        emailStatus: {
            type: 'string',
            isIn: ['unconfirmed', 'changeRequested', 'confirmed'],
            defaultsTo: 'unconfirmed',
            description: 'The confirmation status of the user\'s email address.'
        },

        emailVerifyCode: {
            type: 'string',
            description: 'The confirmation status of the user\'s email address.'
        },

        emailVerifyExpireTime: {
            type: 'number',
            description: 'The confirmation status of the user\'s email address.'
        },


        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },

};

