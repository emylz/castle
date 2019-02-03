var request = require("request");
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

const fetch = require('node-fetch');
const links = [];
const isAHotelRestaurant = [];
const starsRestaurants  =[];

function michelin(){
  var i = 1;
    while(i < 36){
request(

    {
      uri : "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i
    },
    function(error, response, html) {

    var $ = cheerio.load(html);

    var div = $('.poi_card-display-title').each(function(i, element)
    {
      var name = $(element).text();
      starsRestaurants.push(name);
    });
    console.log(starsRestaurants);
    console.log(starsRestaurants.length);
  }


);


i++;}}

function isHotelRestaurant(link, index)
{
  request(
    {uri: "https://www.relaischateaux.com/fr/france/crocodile-bas-rhin"},
    function(error, response, body)
    {
     const isH = [];
      var $ = cheerio.load(body);
      $('.jsSecondNavMain').find('a').each(function(i, element)
    {
      var is = $(element).text();
      isH.push(is);
    });
    var hotel = false, restaurant = false;
    for(var i = 0; i < isH.length; i++)
    {
      if(JSON.stringify(isH[i]).includes('Hôtel')===true)
      {
        hotel = true;
      }
      if(JSON.stringify(isH[i]).includes('Restaurant')===true)
      {
        restaurant = true;
      }
    }
    if(hotel === false || restaurant === false)
    {
      isAHotelRestaurant[index] = false;
    }
    else {
      isAHotelRestaurant[index] = true;
    }
    console.log(isAHotelRestaurant[0]);
  }
  );

}

function chateaux(){
request(
    { uri: "https://www.relaischateaux.com/fr/site-map/etablissements"},

    function(error, response, body){
	  var $ = cheerio.load(body);

    $('#countryF').find("h3:contains('France')").parent().find('.listDiamond > li >a').each( function (i, element) {
      var link = $(element).attr('href');
      links.push(link);
    });

    for(var i = 0; i < links.length; i++)
    {
      if(JSON.stringify(links[i]).includes('/chef/')===true)
      {
        links.splice(i, 1);
      }
     if(JSON.stringify(links[i]).includes('/maitre-maison/')===true)
      {
        links.splice(i, 1);
      }
    }
    console.log('There are ' + links.length + ' hotels or restaurants in France.');

    var a = 0;
    while(a < links.length)
    {
      request(
        {uri: links[a]},
        function(error, response, body)
        {
          const isH = [];
          var $ = cheerio.load(body);
          $('.jsSecondNavMain').find('a').each(function(i, element)
        {
          var is = $(element).text();
          isH.push(is);
        });
        var hotel = false, restaurant = false;
        for(var j = 0; j < 2; j++)
        {
          var test = JSON.stringify(isH[j]);
          if(test.includes('Hôtel')===true)
          {
            hotel = true;
          }
          if(test.includes('Restaurant')===true)
          {
            restaurant = true;
          }
        }
        if(hotel === false || restaurant === false)
        {
          isAHotelRestaurant[a] = false;
        }
        else {
          isAHotelRestaurant[a] = true;
        }
      }
      );
      a++;
    }

}
);}

function chooseHotel()
{
  for(var i = 0; i < isAHotelRestaurant.length; i++)
  {
    if(isAHotelRestaurant[i]===false)
    {
      isAHotelRestaurant.splice(i, 1);
      links.splice(i, 1);
    }
  }
}



//michelin();
chateaux();
//isHotelRestaurant(links[0], 0);
