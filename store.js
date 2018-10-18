import { observable } from "mobx";

class Store {
  @observable dataSource = [];
  @observable startTime = '';
  @observable endTime = '';
}

export default new Store();
