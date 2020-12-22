import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import Auth from "./Auth";
import configureStore from "./redux/configureStore";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

const store = configureStore();

const history = createBrowserHistory({ basename: getBaseName() });

function getBaseName() {
  let url = window.location.href;
  let splitUrl = url.split("/");
  return splitUrl[3].toString();
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <Auth />
    </Provider>
  </Router>,
  document.getElementById("root")
);

export { store };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// serviceWorker.unregister();
