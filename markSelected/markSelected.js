import React, { Component, Fragment } from 'react'
import { Button, Input } from 'antd'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { transform } from 'ol/proj';
import ManualDraw from './js/manual_draw';
import { classGotoMap } from './js/map';
import classSetPop from './js/popup'
import st from './css/style.css'

class MarkSelected extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       center: [113.081622, 22.60267],
  //       zoom: 18
  //     };
  //     this.map = new Map({
  //       target: null,
  //       layers: [
  //         new TileLayer({
  //           source: new OSM({
  //             wrapX: false
  //           })
  //         })
  //       ],
  //       view: new View({
  //         center: transform(this.state.center, 'EPSG:4326', 'EPSG:3857'),
  //         zoom: this.state.zoom
  //       })
  //     })
  //   };


  componentDidMount() {
    var gotomap = new classGotoMap();
  }
  render() {
    let drawPoint = new ManualDraw({
      strokeColor: '#ff0088',
      imageColor: '#ff0088',
      drawtype: 'Point',
    });
    var showPopuEvent = new classSetPop();
    return (
      <Fragment>
        <div style={{margin:10}}>
          <Button style={{ marginRight: 10 }} onClick={() => {
            drawPoint.draw();
          }}>选点</Button>
          <Button style={{ marginRight: 10 }} onClick={() => {
            drawPoint.close();
          }}>取消选点</Button>
          {/* <Button type='primary' onClick={() => {
            showPopuEvent.showPopu();
          }}>showpop</Button> */}
          <Input style={{marginLeft:15, marginRight:5 ,width:250}} placeholder='请输入路线名称'></Input>
          <Button onClick={() => {
            showPopuEvent.showPopu();
          }}>保存并创建</Button>
        </div>
        <div id='map' style={{ width: 1333 }}></div>
        <div id="popup" className={st.olPopup} style={{ display: 'none' }}>
          <a href="#" id="popup-closer" className={st.olPopupCloser}></a>
          <div id="popup-content">
          </div>
          <Button>delete</Button>
        </div>
      </Fragment>
    )
  }
}

export default MarkSelected