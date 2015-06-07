import Dispatcher from "./dispatcher"

export default class AppDispatcher extends Dispatcher {
  handleViewAction(action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    });
  }
}
