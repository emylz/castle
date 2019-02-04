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
    links.forEach(function (url) {
      request(
        {uri: url},
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
          console.log(test);
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
          isAHotelRestaurant.push(false);
        }
        else {
          isAHotelRestaurant.push(true);
        }
      }
      );
    });
    chooseHotel();
}
);}

function chateaux2(){
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
    var compteur=0;
		links.forEach(function(url) {
    var responses = [];
    request({uri: url}, function(error, response, body) {
    $ = cheerio.load(body);
    var isHotel =$('.jsSecondNavMain').find("a").first().text();
    var isRestaurant= $('.jsSecondNavMain').find("li").next().find("a").first().text();
    if(isHotel.includes('Hôtel')==true && isRestaurant.includes('Restaurant')==true)
    {
	  }else
	  {
		    links.splice(compteur,1);
	  }
	  compteur++;
 	  console.log(links.length);
  });
    isStarsRestaurant();

});
}
);}

function isStarsRestaurant()
{
    for(var i = 0; i < links.length; i++)
    {
      var isPresent = false;
      for(var j = 0; j < starsRestaurants.length; j++)
      {
        var star = JSON.stringify(starsRestaurants[j]);
        if(JSON.stringify(links[i]) === star)
        {
            isPresent = true;
            break;
        }
      }
      if(!isPresent)
      {
        links.splice(i, 1);
      }
    }
    console.log('There are ' + links.length + ' stars hotel/restaurants.');
}

//michelin();
chateaux2();
//isHotelRestaurant(links[0], 0);
