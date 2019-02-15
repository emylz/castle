async function isStarsRestaurant(){
  console.log(links.length + ' taillw links');
  links.forEach(async function(url) {
  var responses = [];
  await request({uri: url}, function(error, response, body) {
  $ = cheerio.load(body);
  var rest1 = null, rest2 = null;
  if($('.jsSecondNavSub').find("li").first().find("a").text() != '')
  {
    rest1 =$('.jsSecondNavSub').find("li").first().find("a").text();
    rest1 = rest1.replace(/\s/g, '');
    if($('.jsSecondNavSub').find("li").next().find("a").text() != '')
    {
      rest2 = $('.jsSecondNavSub').find("li").next().find("a").text();
      rest2 = rest2.replace(/\s/g, '');
    }
  }
  else
  {
    rest1 = $('.hotelTabsHeaderTitle').find("h3").text();
    rest1 = rest1.replace(/\s/g, '');
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
});
  compteur++;
  console.log(links.length);
  console.log('There are ' + links.length + ' stars hotel/restaurants.');
});

}

module.exports = isStarsRestaurant;
