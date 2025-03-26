import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./style.css";
import Header from "./public/Header";
import Body from "./public/Body";


const Applayout = () => {
  return (
    <div className="app">
      <Header.Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Applayout />);
