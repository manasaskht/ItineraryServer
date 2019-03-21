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

    'GET /itinerary/notes': 'itinerary/list',


};
