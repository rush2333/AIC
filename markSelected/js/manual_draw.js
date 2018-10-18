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
import {map} from './map'

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
  let textNum = features.getLength();
  let textContent = new Text({
  })
  // let fn = num => {
  //   return new VectorLayer({
  //     source: new VectorSource({
  //       features: features,
  //       wrapX: false
  //     }),
  //     style: new Style({
  //       text: new Text({
  //         text: textContent,
  //       }),
  //       fill: new Fill({
  //         color: drawkSettings.fillColor
  //       }),
  //       stroke: new Stroke({
  //         color: drawkSettings.strokeColor,
  //         width: drawkSettings.strokeWidth
  //       }),
  //       image: new Circle({
  //         radius: drawkSettings.imageRadius,
  //         fill: new Fill({
  //           color: drawkSettings.imageColor
  //         })
  //       })
  //     })
  //   })
  // }
  //   let featureOverlay = fn()
  var featureOverlay = new VectorLayer({
    source: new VectorSource({
      features: features,
      wrapX: false
    }),
    style: new Style({
      text: textContent,
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
    })
  });
  var modify = new Modify({
    features: features,
  });
  var draw;
  this.draw = function() {
    map.removeLayer(featureOverlay);
    map.addLayer(featureOverlay);
    map.addInteraction(modify);
    draw = new Draw({
      features: features,
      type: drawkSettings.drawtype,
      freehand: drawkSettings.freehand
    });
    map.addInteraction(draw);
    map.on('click',() => {
      console.log(textNum)
      textContent.setText(textNum.toString());
    })
  }
  this.close = function(){
    map.removeLayer(featureOverlay);
    map.removeInteraction(draw);
  }
}




export default ManualDraw