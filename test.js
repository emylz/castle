var request = require("request");
var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');

const fetch = require('node-fetch');
const links = [];
const starsRestaurants  =[];

async function chateaux(){
 await request(
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
		links.forEach(async function(url) {
    var responses = [];
    await request({uri: url}, function(error, response, body) {
    $ = cheerio.load(body);
    var isHotel = $('.jsSecondNavMain').find("a").first().text();
    var isRestaurant= $('.jsSecondNavMain').find("li").next().find("a").first().text();
    if(isHotel.includes('Hôtel')==false || isRestaurant.includes('Restaurant')==false)
    {
      links.splice(compteur,1);
	  }
    else
    {
      var rest1 = null, rest2 = null;
      if($('.jsSecondNavSub').find("li").first().find("a").text() != '')
      {
        rest1 =$('.jsSecondNavSub').find("li").first().find("a").text();
        //rest1 = rest1.replace(/\s/g, '');
        if($('.jsSecondNavSub').find("li").next().find("a").text() != '')
        {
          rest2 = $('.jsSecondNavSub').find("li").next().find("a").text();
          //rest2 = rest2.replace(/\s/g, '');
        }
      }
      else
      {
        rest1 = $('.hotelTabsHeaderTitle').find("h3").text();
        //rest1 = rest1.replace(/\s/g, '');
      }
      var isPresent = false;

      for(var j = 0; j < starsRestaurants.length; j++)
      {
        var star = JSON.stringify(starsRestaurants[j]);
        if(star.includes(rest1) == true)
        {
            isPresent = true;
            break;
        }
        if(rest2 != null && star.includes(rest2) == true)
        {
            isPresent = true;
            break;
        }
      }
      if(isPresent == false)
      {
        links.splice(compteur, 1);
      }
      else
      {
        var id = $('.ajaxPages').find('#tabProperty').attr('data-gtm-datalayer');
        var index = id.indexOf("synxis_id");
        if(index != -1){
            var indexComma = id.indexOf(",", index + 11 );
            id = id.substring(index + 11, indexComma);
        }else{ id = 'noSynId'; }

        console.log(id + ' id');



      }
      console.log(links.length + '=> taille links');
    }
	  compteur++;
  });

});
}
);
}

async function getPrice(url, id, mois){
	var today = new Date();
	//il faut remplacer l'id dans la requete(dans le lien) par celle trouvé au dessus
		const response = await fetch("https://www.relaischateaux.com/fr/popin/availability/check?month=2019-"+mois+"&idEntity="+id+"&pax=2&room=1", {"credentials":"include","headers":{"accept":"application/json, text/javascript, */*; q=0.01","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","x-requested-with":"XMLHttpRequest"},"referrer":url,"referrerPolicy":"origin-when-cross-origin","body":null,"method":"GET","mode":"cors"});
		var body =await response.json();
		console.log("mooooooooois " +mois);
		for (var i=1;i<32;i++)
		{
				var week_end = new Date( '2019-'+mois+'-'+i);
				if (week_end.getDay() == 6 )//|| week_end.getDay()==6)
				{
						console.log(i);
						console.log(body['2019-'+mois].pricesPerDay[i]);
				}
		}
 }


//michelin();
//chateaux();
//isHotelRestaurant(links[0], 0);
//getPrice();
/*function chateaux2(){
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
    var isHotel = $('.jsSecondNavMain').find("a").first().text();
    var isRestaurant= $('.jsSecondNavMain').find("li").next().find("a").first().text();
    if(isHotel.includes('Hôtel')==false || isRestaurant.includes('Restaurant')==false)
    {
      links.splice(compteur,1);
	  }
    else name.push(url);
	  compteur++;
    if(compteur==149) {console.log(name.length);}
  });

});
}
);}*/
/*function isHotelRestaurant(link, index){
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

}*/
