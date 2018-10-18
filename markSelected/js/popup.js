import Select from 'ol/interaction/Select';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate';
import { transform } from 'ol/proj';
import { click } from 'ol/events/condition'
import { map } from './map'

export default function classSetPop() {
  this.addEvtClick = function(callback){
    var selectClick = new Select({
      condition: click
    });
    if (selectClick !== null ){
      map.addInteraction(selectClick);
      selectClick.on('select', function(e) {
        var iconSelect = e.target;//获取事件对象，即产生这个事件的元素-->ol.interaction.Select
        var iconCollection = iconSelect.getFeatures();//获取这个事件绑定的features-->返回值是一个ol.Collection对象
        var iconFeatures = iconCollection.getArray();//获取这个集合的第一个元素-->真正的feature
        if (iconFeatures.length > 0) {
          //回调函数，点击事件的响应。
          if ($.isFunction(callback)) {
            callback(iconFeatures[0].getGeometry().getCoordinates());
          }
          else {
            alert("This is a click event!");
          }
        }
      });
    }
}
  
  this.showPopu = function(){
    this.addEvtClick(function(coordinate) {
      $("#popup").css("display", "block");
      let container = document.getElementById('popup');
      let closer = document.getElementById('popup-closer');
      let popOverlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        offset: [10, -20]
      });
      map.addOverlay(popOverlay);
      let hdms = toStringHDMS(transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
      $("#popup-content").html('<p>You clicked here:</p><code>' + hdms + '</code>');
      popOverlay.setPosition(coordinate);
      closer.onclick = function () {
        popOverlay.setPosition(undefined);
        closer.blur();
        return false;
      };
    });
  }

}