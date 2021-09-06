var request = require('request');
var prompt = require('prompt');

var fs = require('fs');


prompt.start();
// input from user
prompt.get(['searchKey'], function (err, result) {
  console.log('  Type key to search Jokes: ' + result.searchKey);
  var options = {
    'method': 'GET',
    'url': `https://icanhazdadjoke.com/search?term=${result.searchKey}`,
    'headers': {
      'Accept': 'application/json'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let data = JSON.parse(response.body);
    if (data.results.length == 0) {
      console.log('No jokes was found');
    } else {
      console.log(`${data.results.length} jokes found.`);
      
      
      data.results.forEach((element, index) => {
        fs.appendFile('jokes.txt', JSON.stringify(element.joke) + "\n", function (err, res) {
          if (index == data.results.length - 1)
            console.log('Please check jokes.txt file to see the jokes with searched key ' + result.searchKey)
        });
        
      });
      fs.appendFileSync('jokes.txt',"\n");
    }

  });
});




