# Castle

My project:

https://emylz-castle.netlify.com

> Sleep well with Relais & Châteaux

![castle](https://media.relaischateaux.com/public/hash/919a5432f068d38d0b14b87e52fc27ae66c84376)

Table of Contents

🐣 Introduction
🎯 Objectives
🏃‍♀️ Steps to do
Stack
👩‍💻 Just tell me what to do
🏃‍♀️ Example of Steps to do
Investigation
Hotels from Relais & Châteaux
Michelin Restaurant
The web application
Server-side with Node.js
require('castle')
require('michelin')
Client-side with React
Notification (bonus)
Don't forget
Licence
🐣 Introduction
🎯 Objectives
List the best rates - for each Weekend - for France located Relais & Châteaux with starred restaurants

🏃‍♀️ Steps to do
Create a connection between relaischateaux.com, restaurant.michelin.fr and the end-user.

Stack
Node.js + React + Material Design (mdl, bootstrap, foundation...) + ES6 [+ docker + redis ...]
👩‍💻 Just tell me what to do
Fork the project via github
fork

Clone your forked repository project https://github.com/YOUR_USERNAME/castle
❯ cd /path/to/workspace
❯ git clone git@github.com:YOUR_USERNAME/castle.git
Do things

commit your different modifications:

❯ cd /path/to/workspace/castle
❯ git add -A && git commit -m "feat(michelin): get list of starred restaurants"
(why following a commit message convention?

Don't forget to commit early, commit often and push often
❯ git push origin master
Note: if you catch an error about authentication, add your ssh to your github profile.

If you need some helps on git commands, read git - the simple guide
🏃‍♀️ Example of Steps to do
Investigation
Properties from Relais & Châteaux
How it works https://www.relaischateaux.com ?
How to get the list of Hotel + restaurant
How to identify the restaurant(s) name ?
How to compute the booking price for all weekend ? for a given weekend?
etc ...

Some things to do:

Browse the website
Check how that you can get list of properties: api etc.... (check network activity)
Check how that you can get list of restaurants for a given property: api etc.... (check network activity)
define the JSON schema for Property
etc ...

Example of Property: https://www.relaischateaux.com/fr/france/mercues-lot-mercues

Michelin Restaurant
How it works https://restaurant.michelin.fr
What are the given properties for a starred restaurant: name, adress, town, stars, chef... ?
...
Some things to do:

Browse the website
define the JSON schema for a restaurant
Check how that you can get list of starred restaurants: api etc.... (check network activity)
etc...

Example of Restaurant: https://restaurant.michelin.fr/2akhln2/lauberge-des-glazicks-plomodiern

The web application
Some things to do:

How to create a connection between Relais & Châteaux and the starred restaurant?
Server-side with Node.js
require('castle')
Create a module called castle that returns the list of best rates for all Weekends for each Property

const castle = require('castle');
...
const property = {...};


const properties = castle.getProperties();
const prices = castle.getPrices(property);

...
Some things to do:

create the calls (api, http) to get the Property page
get the restaurants name (by scraping or decoding api response)
check if the restaurant is starred.
get the price by Weekend (by scraping or decoding api response)
require('michelin')
Create a module called michelin that return the list of restaurant

const michelin = require('michelin');

const starred = michelin.get();

...
Some things to do:

scrape list of France located starred restaurants
store the list into JSON file, nosql database (like redis, mongodb...)
create a node module that returns the list
Client-side with React
MVP to do:

For each Weekend, list best rates for France located Relais & Châteaux with starred restaurants
Next features:

Add filters:
filtering by name
sorting by stars
sorting by price
sorting by distance
Bonus: Display on a map only Relais & Châteaux with starred restaurants.
Notification (bonus)
Some things to do:

Notify me (discord or slack) a new best rate price for any Relais & Châteaux with starred restaurant.
Don't forget
Focus on codebase and UX/UI

Licence
Uncopyrighted
