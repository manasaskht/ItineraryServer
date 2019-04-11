# itinerary-server

a [Sails v1](https://sailsjs.com) application

SailsJS is a NodeJS based server-side framework. It provides a good architecture for development of web apis.


* Open git bash and clone : `git@git.cs.dal.ca:ntyagi/itinerary-server.git`
* run command : git checkout master
* run command : npm install  (to install required node modules)
* run command : sails lift (It will start the backend server at localhost:1337)




`SendGrid:` To send registration email, SendGrid is a professional email service which offers free smtp server.

`JWT: JSON Web Tokens`. For authentication of users, Json web tokens are implemented. JWTs has certain expiry time embedded in themselves and allow authorization of users without storing the token in a database. It is also helpful when creating multiple servers for horizontal scaling.

`Database:` Currently simple file database offered by SailsJS ORM (Waterline) is used known as sails-disk db. This database simply creates a file for each model and saves data as rows.


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


