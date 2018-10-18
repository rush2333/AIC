import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from './app';
const root = document.getElementById("root");

const render = (Com) => {
  ReactDOM.hydrate(
    <Com />,root
  )
};

render(App);
