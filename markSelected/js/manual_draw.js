import Collection from 'ol/Collection'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Text from 'ol/style/Text'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'
import Modify from 'ol/interaction/Modify'
import Draw from 'ol/interaction/Draw'
import { map } from './map'
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';

const data = [
  [12587974.876146005, 2584205.489495143],
  [12588009.378976336, 2584201.508396432],
  [12588033.265547676, 2584186.247539509],
  [12588066.441351326, 2584168.332611005],
  [12588087.673851084, 2584157.052843231],
  [12588117.532065257, 2584140.464932293],
  [12588129.475350928, 2584126.531111161],
]

var featuresArr;
function ManualDraw(drawOptions) {
  var drawkSettings = $.extend({
    fillColor: 'rgba(255, 255, 255, 0.2)',
    strokeColor: '#ffcc33',
    strokeWidth: 2,
    imageRadius: 10,
    imageColor: '#ffcc33',
    drawtype: 'LineString', //Point/LineString/Polygon/Circle
    freehand: false
  }, drawOptions);
  var features = new Collection();
  var featurePoint = new Feature();
  var featureOverlay = new VectorLayer({
    source: new VectorSource({
      features: features,
      wrapX: false
    }),
  });
  var modify = new Modify({
    features: features,
  });
  function sum(m, n) {
    var num = Math.floor(Math.random() * (m - n) + n);
    return num
  }
  this.check = function () {
    console.log(featurePoint);
    for (let i = 0; i < data.length; i++) {
      let featureGeometry = new Point(data[i]);
      console.log(featureGeometry);
      featurePoint.setGeometry(featureGeometry);
      features.push(featurePoint);
    }
    features.array_.forEach((feature, index) => {
      feature.setStyle(
        new Style({
          text: new Text({
            text: '' + `${index + 1}`,
            font: '18px sans-serif '
          }),
          fill: new Fill({
            color: drawkSettings.fillColor
          }),
          stroke: new Stroke({
            color: drawkSettings.strokeColor,
            width: drawkSettings.strokeWidth
          }),
          image: new Circle({
            radius: drawkSettings.imageRadius,
            fill: new Fill({
              color: drawkSettings.imageColor
            })
          })
        }))
    })
    map.addLayer(featureOverlay);
  }
  var draw;
  this.draw = function () {
    map.on('click', () => {
      features.array_.forEach((feature, index) => {
        feature.setStyle(
          new Style({
            text: new Text({
              text: '' + `${index + 1}`,
              font: '18px sans-serif '
            }),
            fill: new Fill({
              color: drawkSettings.fillColor
            }),
            stroke: new Stroke({
              color: drawkSettings.strokeColor,
              width: drawkSettings.strokeWidth
            }),
            image: new Circle({
              radius: drawkSettings.imageRadius,
              fill: new Fill({
                color: drawkSettings.imageColor
              })
            })
          }))
      })
    })
    map.removeLayer(featureOverlay);
    map.addLayer(featureOverlay);
    map.addInteraction(modify);
    draw = new Draw({
      features: features,
      type: drawkSettings.drawtype,
      freehand: drawkSettings.freehand
    });
    map.addInteraction(draw);
  }
  this.close = function () {
    map.removeInteraction(draw);
  }
  this.delete = function (e) {
    // console.log(e)
  }
  featuresArr = features;
}




export { ManualDraw, featuresArr }
