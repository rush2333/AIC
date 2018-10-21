import React, { Component, Fragment } from 'react'
import { Button, Input, Table, Row, Col } from 'antd'
import { observer } from "mobx-react";
import { ManualDraw, featuresArr } from './js/manual_draw';
import { classGotoMap } from './js/map';
import classSetPop from './js/popup'
import st from './css/style.css'

const columns = [
  {
    title: '序号'
  },
  {
    title: '经纬度'
  },
  {
    title: '操作'
  }
];
const drawPoint = new ManualDraw({
  strokeColor: '#0066FF',
  imageColor: '#0066FF',
  drawtype: 'Point',
});
const showPopu = new classSetPop();


@observer
class MarkSelected extends Component {
  buttonClickEvent() {
    drawPoint.close()
  }
  componentDidMount() {
    var gotomap = new classGotoMap();
    showPopu.showPopu();
  }
  render() {
    let drawPointClass = drawPoint;
    let showPopuEvent = showPopu;
    return (
      <div className={st.content}>
        <div style={{ margin: 20 }}>
          <Button style={{ marginRight: 10 }} onClick={() => {
            drawPointClass.draw();
            // showPopuEvent.addEvtClick();
          }}>选点</Button>
          <Button style={{ marginRight: 10 }} onClick={() => {
            drawPointClass.close();
          }}>取消选点</Button>
          <Input style={{ marginRight: 5, width: 250 }} placeholder='请输入路线名称'></Input>
          <Button className='btn1' onClick={() => {
            drawPoint.check()
          }}>check</Button>
        </div>
        <Row>
          <Col span={16}>
            <div id='map-containet' style={{ width: 1048, margin: '0 20px' }}>
              <div id='map' style={{ width: '100%', height: 800 }}></div>
              <div id="popup" className={st.olPopup} style={{ display: 'none' }}>
                <a href="#" id="popup-closer" className={st.olPopupCloser}></a>
                <div id="popup-content">
                </div>
                <Button id='popup-delete'>delete</Button>
              </div>
            </div>
          </Col>
          <Col span={8}>
            {/* <Table columns={columns} style={{width:'100%'}}></Table> */}
          </Col>
        </Row>

      </div>
    )
  }
}

export default MarkSelected