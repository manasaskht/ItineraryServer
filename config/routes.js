/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'POST /account/login': 'account/login',
    'POST /account/register': 'account/register',
    'POST /account/logout': 'account/logout',
    'GET /account/activate': 'account/activate',

    'POST /itinerary/new': 'itinerary/new',
    'POST /itinerary/item/new': 'itinerary/item/new',

    'GET /itinerary/ls': 'itinerary/list',
    'GET /itinerary/item/ls': 'itinerary/item/list',

    'GET /itinerary/notes': 'itinerary/notes/list',
    'POST /itinerary/notes/update': 'itinerary/notes/update',
    'PUT /itinerary/notes/new': 'itinerary/notes/new',
    'DELETE /itinerary/notes/delete': 'itinerary/notes/delete',

    'DELETE /itinerary/item/delete': 'itinerary/item/delete',
    'PUT /itinerary/item/edit': 'itinerary/item/edit',

    'POST /social/friend/add': 'social/addfriend',
    'GET /social/friend/get': 'social/getfriends',
    'DELETE /social/friend/delete': 'social/deletefriend',

    'POST /social/group/create': 'social/creategroup',
    'GET /social/group/get': 'social/getgroups',
    'POST /social/group/member/add': 'social/addgroupmember',

    'POST /chat/friend/add': 'chat/add',
    'POST /chat/group/add': 'chat/addgroup',
    'POST /chat/message/send': 'chat/send',
    'GET /chat/message/get': 'chat/get'
};
