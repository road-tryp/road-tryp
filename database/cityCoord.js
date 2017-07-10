var fs = require('fs');
var Promise = require("bluebird");
var path = require("path");

module.exports = cityCoord = function(depart, arrive) {
  return new Promise((response, reject) => {
    fs.readFile(path.join(__dirname, './cities.json'), (err, data) => {
      if (err){
        reject(err);
      } else {
        cities = JSON.parse(data);
        let obj = {};
        cities.forEach(city => {
          obj[city.city] = {lat:city.latitude, lon:city.longitude}
        });
        response([obj[depart], obj[arrive]]);
      }
    });
  })
}
