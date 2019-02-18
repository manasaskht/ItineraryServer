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
    'GET /account/activate': 'account/activate'

};
