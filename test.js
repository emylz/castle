var cheerio = require('cheerio');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var request = require("request-promise");
var fetch = require('node-fetch');
const michelin = require('./michelin');
var starsRestaurants = michelin.exp;

var links = [];
var url = [];

var jsonTab = [];
var jsonArr = [];
var idArray = [];

async function michelin_(){
  let i = 1;
  let star = [];
    while(i < 36){
       await request(
        {
          uri : "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i
        },
         function(error, response, html) {

        let $ = cheerio.load(html);

        var div = $('.poi_card-display-title').each(function(i, element)
        {
            var name = $(element).text();
            name = name.trim();
            star.push(name);
        });
      }
    );
    i++;}
    return star;
}

async function getUrl(){
  let li = [];
  await request("https://www.relaischateaux.com/fr/site-map/etablissements",(error, response, body)=>{
       let $ = cheerio.load(body);

       $('#countryF').find("h3:contains('France')").parent().find('.listDiamond > li >a').each( async function (i, element) {
         var link = $(element).attr('href');
         li.push(link);
       });
     });
     return li;
}

async function chateaux(){
      links = await getUrl();
      console.log(starsRestaurants.length + ' starred restaurants with Michelin');
        for(let i = 0; i < links.length; i++)
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
        let compteur=0;

        for(let i = 0; i < links.length; i++)
        {
            await request(links[i],(error, response, body)=> {
                let $ = cheerio.load(body);
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
                    rest1 = rest1.trim();
                    if($('.jsSecondNavSub').find("li").next().find("a").text() != '')
                    {
                      rest2 = $('.jsSecondNavSub').find("li").next().find("a").text();
                      rest2 = rest2.trim();
                    }
                  }
                  else
                  {
                    rest1 = $('.hotelTabsHeaderTitle').find("h3").text();
                    rest1 = rest1.trim();
                  }
                  var isPresent = false;

                  for(let j = 0; j < starsRestaurants.length; j++)
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
                  else {
                    let id = $('.ajaxPages').find('#tabProperty').attr('data-gtm-datalayer');
                    let index = id.indexOf("synxis_id");
                    if(index != -1){
              			        var indexComma = id.indexOf(",", index + 11 );
              			        id = id.substring(index + 11, indexComma);
              			}
                    else{id = 'noSynId';}
                    console.log(id);
                    idArray.push(id);
                    let price = null;
                    if(id != 'noSynId')
                    {
                      (async () => {
                        for(let i = 1; i < 13; i++){
                      			await getPrice(id,i);
                          }
          						})();
                    }
                  }
                }
  	             compteur++;
               });
            }
            if(compteur < 200)
            {
              console.log(links.length);
              fs.writeFile('./app/src/Component/hotel.json', JSON.stringify(jsonTab, null, 4), function(err){
              															console.log('hotel.json successfully written! - Check/app/src/Component for hotel.json file');
              															if (err) console.log(err);
              															});
              for(let i = 0; i < idArray.length; i++)
              {
                var obj = {url:links[i], id:idArray[i]};
                jsonArr.push(obj);
              }
              fs.writeFile('./app/src/Component/hotel_id.json', JSON.stringify(jsonArr, null, 4), function(err){
              															console.log('hotel_id.json successfully written! - Check /app/src/Component for hotel_id.json file');
              															if (err) console.log(err);
              															});
            }


        }

async function getPrice(id, mois){
		const response = await fetch("https://www.relaischateaux.com/fr/popin/availability/check?month=2019-"+mois+"&idEntity="+id+"&pax=2&room=1", {"credentials":"include","headers":{"accept":"application/json, text/javascript, */*; q=0.01","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","x-requested-with":"XMLHttpRequest"},"referrer":url,"referrerPolicy":"origin-when-cross-origin","body":null,"method":"GET","mode":"cors"});
		let body =await response.json();
    let array = [];
		for (let i=1;i<32;i++)
		{
				let week_end = new Date( '2019-'+mois+'-'+i);
				if (week_end.getDay() === 6 || week_end.getDay() ===7)
				{
          if (body['2019-'+mois].pricesPerDay[i]!=undefined){
                  let tmp = {id:id, month:mois, date:week_end, price:body['2019-'+mois].pricesPerDay[i] };
                  jsonTab.push(tmp);
            }
				}
		}
 }

chateaux();
