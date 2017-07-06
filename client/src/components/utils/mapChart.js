module.exports = () => {
  // svg path for target icon
  var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
  // svg path for plane icon
  // var planeSVG = "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";



  var map = AmCharts.makeChart( "chartdiv", {
    "listeners": [{
        "event": "mouseDownMapObject",
        "method": function(event) {
          console.log(event.mapObject.title);
          // document.getElementById("placeholder").innerHTML = '<img src="http://lorempixel.com/200/200/city/' + event.mapObject.title + '/" />';
        }
      }],

    "areasSettings": {
      "autoZoom": false,
      // "selectedColor": "#CC0000",
      "selectedColor": "#000000",
      "selectable": true,
    },
    "type": "map",
    "theme": "light",
    "dataProvider": {
      // "map": "worldLow",
      "zoomLevel": 1,
      // "zoomLongitude": 37.09,
      // "zoomLatitude": 49.1712,
      map : "usa2Low",

      getAreasFromMap : true,
      "areas": [{
        // hide Corsica
        "id": ["US-AK"],
        "alpha": 0,
        "mouseEnabled": false
      }, {
        // hide Corsica
        "id": ["US-HI"],
        "alpha": 0,
        "mouseEnabled": false
      }, {
        "id": ["US-CA"],
        "color": "#000000",
      }

      ],

      "lines": [ {
        "latitudes": [ 37.77493, 50.4422 ],
        "longitudes": [ -122.419416, 30.5367 ],
      }, {
        "latitudes": [ 37.77493, 46.9480 ],
        "longitudes": [ -122.419416, 7.4481 ]
      }, {
        "latitudes": [ 37.77493, 59.3328 ],
        "longitudes": [ -122.419416, 18.0645 ]
      }, {
        "latitudes": [ 37.77493, 40.712784 ],
        "longitudes": [ -122.419416, -74.005941 ],
        "alpha": 0
      }],
      "images": [ {
        "svgPath": targetSVG,
        "title": "Kiev",
        "latitude": 50.4422,
        "longitude": 30.5367,
        "scale": 0.5,
      }, {
        "svgPath": targetSVG,
        "title": "Bern",
        "latitude": 46.9480,
        "longitude": 7.4481,
        "scale": 0.5
      }, {
        "svgPath": targetSVG,
        "title": "Stockholm",
        "latitude": 59.3328,
        "longitude": 18.0645,
        "scale": 0.5
      }, {
        "svgPath": targetSVG,
        "title": "New York",
        "latitude": 40.712784,
        "longitude": -74.005941,
        "scale": 0.5
       },
       {
        "id": "California",
        "svgPath": targetSVG,
        "title": "San Francisco",
        "latitude": 37.77493,
        "longitude": -122.419416,
        "scale": 1
      }]
    },

    "areasSettings": {
      "unlistedAreasColor": "#FFCC00",
      "unlistedAreasAlpha": 0.9
    },

    "imagesSettings": {
      "color": "#CC0000",
      "rollOverColor": "#CC0000",
      "selectedColor": "#000000"
    },

    "linesSettings": {
      "arc": -0.7, // this makes lines curved. Use value from -1 to 1
      "color": "#CC0000",
      "alpha": 0.4,
      "arrowAlpha": 1,
      "arrowSize": 4
    },
    "zoomControl": {
      "gridHeight": 100,
      "draggerAlpha": 1,
      "gridAlpha": 0.2
    },

    "backgroundZoomsToTop": true,
    "linesAboveImages": true,

    "export": {
      "enabled": true
    }
  });
}



