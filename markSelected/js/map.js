import Map from 'ol/Map'
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { transform } from 'ol/proj';
// import PluggableMap from 'ol/PluggableMap.js'

var map;
var classGotoMap = function (mapOptions) {
  var mapSettiings = $.extend({
    mapTarget: 'map',
    mapSouce: new OSM({
      wrapX: false
    }),
    mapCenter: [113.081622, 22.60267],
    mapZoom: 18
  }, mapOptions);

  var accessibleSource = mapSettiings.mapSouce;
  var accessibleLayers = [
    new TileLayer({
      source: accessibleSource
    })
  ];
  var accessibleView = new View({
    center: transform(mapSettiings.mapCenter, 'EPSG:4326', 'EPSG:3857'),
    zoom: mapSettiings.mapZoom
  });
  var themap = new Map({
    layers: accessibleLayers,
    target: mapSettiings.mapTarget,
    view: accessibleView
  });
  map = themap;
  return map
};
export { map, classGotoMap}