module.exports = (trips) => {
  // svg path for target icon
  // console.log("Received trips obj: ", trips);

  var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

  let lines = [], images = [];
  trips.forEach((trip) => {
    lines.push({"latitudes": [trip.arrival_city_coord.lat, trip.depart_city_coord.lat],
                "longitudes": [trip.arrival_city_coord.lon, trip.depart_city_coord.lon]});

    images.push({"svgPath": targetSVG, "title": trip.departure_city, "latitude": trip.arrival_city_coord.lat, "longitude": trip.arrival_city_coord.lon, "scale": 0.5});

    images.push({"svgPath": targetSVG, "title": trip.arrival_city, "latitude": trip.depart_city_coord.lat, "longitude": trip.depart_city_coord.lon, "scale": 0.5});
  });

  var map = AmCharts.makeChart( "chartdiv", {
    "type": "map",
    "listeners": [{
      "event": "mouseDownMapObject",
      "method": function(event) {
      }
    }],
    "imagesSettings": { // circle
      "color": "gray",
      "rollOverColor": "gray",
      "selectedColor": "gray",
    },
    "linesSettings": { // line between cities
      "arc": -.7, // this makes lines curved. Use value from -1 to 1
      "color": "gray",
      "thickness": 1.4
    },
    "zoomControl": {
      "gridHeight": 100,
      "draggerAlpha": 1,
      "gridAlpha": 0.2
    },
    "backgroundZoomsToTop": true,
    "linesAboveImages": true,
    "areasSettings": {
      "autoZoom": false,
      "rollOverOutlineColor": "#ffffff",
      "selectedColor": "#21BA45",
    },
    "dataProvider": {
      "zoomLevel": 1.1,
      "map" : "usa2Low",
      "getAreasFromMap" : true,
      "areas": [{
        "id": "US-AK",
        "alpha": 0,
        "mouseEnabled": false
      }, {
        "id": "US-HI",
        "alpha": 0,
        "mouseEnabled": false
      },
      { id: 'US-AL', color: '#21BA45' },
      { id: 'US-AZ', color: '#21BA45' },
      { id: 'US-AR', color: '#21BA45' },
      { id: 'US-CA', color: '#21BA45' },
      { id: 'US-CO', color: '#21BA45' },
      { id: 'US-CT', color: '#21BA45' },
      { id: 'US-DE', color: '#21BA45' },
      { id: 'US-FL', color: '#21BA45' },
      { id: 'US-GA', color: '#21BA45' },
      { id: 'US-ID', color: '#21BA45' },
      { id: 'US-IL', color: '#21BA45' },
      { id: 'US-IN', color: '#21BA45' },
      { id: 'US-IA', color: '#21BA45' },
      { id: 'US-KS', color: '#21BA45' },
      { id: 'US-KY', color: '#21BA45' },
      { id: 'US-LA', color: '#21BA45' },
      { id: 'US-ME', color: '#21BA45' },
      { id: 'US-MD', color: '#21BA45' },
      { id: 'US-MA', color: '#21BA45' },
      { id: 'US-MI', color: '#21BA45' },
      { id: 'US-MN', color: '#21BA45' },
      { id: 'US-MS', color: '#21BA45' },
      { id: 'US-MO', color: '#21BA45' },
      { id: 'US-MT', color: '#21BA45' },
      { id: 'US-NE', color: '#21BA45' },
      { id: 'US-NV', color: '#21BA45' },
      { id: 'US-NH', color: '#21BA45' },
      { id: 'US-NJ', color: '#21BA45' },
      { id: 'US-NM', color: '#21BA45' },
      { id: 'US-NY', color: '#21BA45' },
      { id: 'US-NC', color: '#21BA45' },
      { id: 'US-ND', color: '#21BA45' },
      { id: 'US-OH', color: '#21BA45' },
      { id: 'US-OK', color: '#21BA45' },
      { id: 'US-OR', color: '#21BA45' },
      { id: 'US-PA', color: '#21BA45' },
      { id: 'US-RI', color: '#21BA45' },
      { id: 'US-SC', color: '#21BA45' },
      { id: 'US-SD', color: '#21BA45' },
      { id: 'US-TN', color: '#21BA45' },
      { id: 'US-TX', color: '#21BA45' },
      { id: 'US-UT', color: '#21BA45' },
      { id: 'US-VT', color: '#21BA45' },
      { id: 'US-VA', color: '#21BA45' },
      { id: 'US-WA', color: '#21BA45' },
      { id: 'US-WV', color: '#21BA45' },
      { id: 'US-WI', color: '#21BA45' },
      { id: 'US-WY', color: '#21BA45' }
      ],
      "lines": lines,
      "images": images,
    },
  });
}



