var request = require("request-promise");
var cheerio = require('cheerio');
var star = [];

function michelin(){
  let i = 1;
    while(i < 36){
       request(
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
    exports.exp = star;
}

michelin();
