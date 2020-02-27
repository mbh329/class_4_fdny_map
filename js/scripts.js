// this is my mapboxGL token
// the base style includes data provided by mapbox, this links the requests to my account
mapboxgl.accessToken = 'pk.eyJ1IjoibWJoMzI5IiwiYSI6ImNrNnUyejFycTA1bzAzbXBtb205cW53NmUifQ.9yI7-YS_XsPUNaTKblgY8w';
// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-73.99114, 40.73738]
var initialZoom = 10.06
// helper function to look up borough
var BoroughLookup = (Borough) => {
  switch (Borough) {
    case Manhattan:
      return {
        color: '#f4f455',
        description: 'Manhattan',
      };
    case Brooklyn:
      return {
        color: '#FF9900',
        description: 'Brooklyn',
      };
    case Queens:
      return{
        color: '#ea6661',
        description: 'Queens'
      };
    case Bronx:
      return {
        color: '#5CA2D1',
        description: 'The Bronx'
      };
    case StatenIsland:
      return{
        color: '#8ece7c',
        description: ' Staten Island'
      };
  }
};
// set the default text for the feature-info div
var defaultText = '<p>Move the mouse over the map to get more info on a Fire Station</p>'
$('#feature-info').html(defaultText)
// create an object to hold the initialization options for a mapboxGL map
var initOptions = {
  container: 'map-container', // put the map in this container
  style: 'mapbox://styles/mapbox/dark-v10', // use this basemap
  center: initialCenterPoint, // initial view center
  zoom: initialZoom, // initial view zoom level (0-18)
}
// create the new map
var map = new mapboxgl.Map(initOptions);
// add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// wait for the initial style to Load
map.on('style.load', function() {
  // add a geojson source to the map using our external geojson file
  map.addSource('fdny_stations', {
    type: 'geojson',
    data: './data/fdny_stations.geojson',
  });
  // let's make sure the source got added by logging the current map state to the console
  console.log(map.getStyle().sources)
  // add a layer for our custom source
  map.addLayer({
    id: 'point_fdny_stations',
    type: 'circle',
    source: 'fdny_stations',
    paint: {
// make circles larger as the user zooms from z12 to z22

'circle-color': [
  'match',
['get', 'Borough'],
 'Manhattan',
 '#f4f455',
 'Bronx',
 '#5CA2D1',
 'Brooklyn',
 '#FF9900',
 'Queens',
 '#ea6661',
 'StatenIsland',
 '#8ece7c',
 /* other */ '#ccc'
]

}
});
});

//code above works - don't mess with it
// add an empty data source, which we will use to highlight the station the user is hovering over
map.addSource('highlight_fdny_stations', {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: []
  }
})

// add a layer for the highlighted station
map.addLayer({
  id: 'highlight-circle',
  type: 'circle',
  source: 'highlight_fdny_stations',
  paint: {
    'circle-radius': 5,
    'circle-opacity': 1,
    'circle-color': 'black',
  }
});

map.on('mousemove', function (e) {
   // query for the features under the mouse, but only in the lots layer
   var features = map.queryRenderedFeatures(e.point, {
       layers: ['highlight_fdny_stations'],
   });

   // if the mouse pointer is over a feature on our layer of interest
   // take the data for that feature and display it in the sidebar
})
