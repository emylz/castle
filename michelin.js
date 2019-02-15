async function michelin(){
  var i = 1;
    while(i < 36){
await request(

    {
      uri : "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+i
    },
    function(error, response, html) {

    var $ = cheerio.load(html);

    var div = $('.poi_card-display-title').each(function(i, element)
    {
      var name = $(element).text();
      //name = name.replace(/\s/g, '');
      starsRestaurants.push(name);
    });
  }


);


i++;}}

module.exports = michelin;
