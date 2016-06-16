# Node Demonstration Application 

This application demonstrates various aspects of NodeJS applications. 
The server uses <a href="http://www.embeddedjs.com/">EJS</a> for templating.
It explores routing, controllers and the use of require for modules. Basic web site 
functionality such as cookies and sessions are also demonstrated. Session 
persistence is via Mongodb.
Additionally, it demonstrates REST services with Node and Express, and
Websockets with socket.io.

Also included are  an Angular JS applications which use Mongodb for persistence, and a ReactJS application

This project is the source code for a node demonstration application. The
application is housed at  
<a href="http://donhenton-node.herokuapp.com/">http://donhenton-node.herokuapp.com/</a> .


### Enabling CORS

http://enable-cors.org/server_expressjs.html
http://jonathanmh.com/how-to-enable-cors-in-express-js-node-js/


### Sessions and Middleware

> https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions/
> http://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for

##  Running locally

###Start Mongodb
brew install mongodb

to run

1. create a mongod.conf file

```
#mongod.conf

#logs
logpath=/Users/dhenton/mongo_data/logs/mongolog.log
logappend=true


#path to database
dbpath=/Users/dhenton/mongo_data/db
```

run mongod -f /Users/dhenton/mongo_data/mongod.conf
or mongod --dbpath=/Users/dhenton/mongo_data/db

### Start node server
node server.js (at root directory)

