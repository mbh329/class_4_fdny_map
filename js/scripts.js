// this is my mapboxGL token
// the base style includes data provided by mapbox, this links the requests to my account
mapboxgl.accessToken = 'pk.eyJ1IjoibWJoMzI5IiwiYSI6ImNrNnUyejFycTA1bzAzbXBtb205cW53NmUifQ.9yI7-YS_XsPUNaTKblgY8w';

// we want to return to this point and zoom level after the user interacts
// with the map, so store them in variables
var initialCenterPoint = [-73.991780, 40.676]
var initialZoom = 13

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
        description: 'Queens';
      };
    case Bronx:
      return{
        color: '#5CA2D1',
        description: 'The Bronx',
      };
    case: Staten Island:
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
    type: 'Point',
    source: 'fdny_stations',
    paint: {
      'point-color': {
        type: 'point',
        property: 'coordinates'

      }
    }
  });
