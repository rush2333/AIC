import React, { Component } from "react";
import { Table, Card, DatePicker, Button } from "antd";
import locale from "antd/lib/date-picker/locale/zh_CN";
import store from "./store";
import request from "./request";
import { observer } from "mobx-react";
import exportFile from "./export-file";
const columns = [
  {
    title: "企业地址",
    dataIndex: "org_address",
    key: "org_name",
    width: 150
  },
  {
    title: "所属片区",
    dataIndex: "word_area",
    key: "word_area",
    width: 150
  },
  {
    title: "被检查人代表",
    dataIndex: "represented",
    key: "represented",
    width: 120
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    key: "phone",
    width: 120
  },
  {
    title: "检查日期",
    dataIndex: "check_date",
    key: "check_date",
    width: 120
  },
  {
    title: "检查情况",
    dataIndex: "check_status",
    key: "check_status",
    width: 280
  },
  {
    title: "检查人员",
    dataIndex: "check_people",
    key: "check_people",
    width: 90
  },
  {
    title: "检查人员意见",
    dataIndex: "check_advice",
    key: "check_advice",
    width: 200
  }
];
const { RangePicker } = DatePicker;
@observer
class App extends Component {
  fetchList = () => {
    request({
      url: "/js_aic/getdata.aspx",
      method: "POST",
      data: {
        type: "nolicence_jmgs",
        startTime: store.startTime,
        endTime: store.endTime
      },
      success: res => {
        if (res.result === "ok") {
          store.dataSource = res.table;
        }
      }
    });
  };
  componentDidMount() {
    this.fetchList();
  }
  exportFileA = () => {
    request({
      url: "/js_aic/getdata.aspx",
      data: {
        type: "nolicence_jmgs_down",
        startTime_down: store.startTime,
        endTime_down: store.endTime
      },
      success: res => {
        exportFile({
          url: res.url
        });
      }
    });
  };
  onChange = (value, dateString) => {
    store.startTime = dateString[0];
    store.endTime = dateString[1];
  };
  render() {
    let { dataSource, startTime, endTime } = store;
    return (
      <div style={{ backgroundColor: "#f6f8fa", maxWidth: 1666, fontSize: 12 }}>
        <Card style={{ marginBottom: 15 }}>
          <span>时间范围：</span>
          <RangePicker
            locale={locale}
            onChange={this.onChange}
            format="YYYY-MM-DD"
          />
          <Button
            icon="search"
            onClick={this.fetchList}
            style={{ top: -1, marginLeft: 10 }}
          >
            查询
          </Button>
          <Button
            type="primary"
            icon="arrow-down"
            style={{ marginLeft: 50, top: -2 }}
            onClick={this.exportFileA}
          >
            导出
          </Button>
        </Card>
        <Card title="无照经营" style={{ margin: 40 }}>
          <Table columns={columns} dataSource={dataSource} key="org_address" />
        </Card>
      </div>
    );
  }
}

export default App;
