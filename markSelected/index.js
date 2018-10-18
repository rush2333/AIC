import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import MarkSelected from './markSelected';
const root = document.getElementById("root");

const render = (Com) => {
  ReactDOM.hydrate(
    <Com />, root
  )
};

render(MarkSelected);
