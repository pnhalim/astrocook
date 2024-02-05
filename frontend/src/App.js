import React, { useState } from "react";
import Recipe from "./Recipe";

import logo from './img/chef-hat.png';
import search from './img/search-icon.png';


const App = () => {

  const [url, setUrl] = useState("");
  const [currentTextBox, setCurrentTextBox] = useState("")

  const OnFormSubmit = (e) => {
    e.preventDefault();
    setUrl(e.target.value.value);
    setCurrentTextBox(e.target.value.value);
  }

  const OnValueUpdated = (e) => {
    setCurrentTextBox(e.target.value)
  }

    return (
      <div>
      {
        url === "" ?
        <div>
          <div className="center-parent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <img width={130} src={logo}></img>
            <div className="spacer-mini"></div>
            <h1 className="center-text">astrocook</h1>
            <div className="spacer-mini"></div>
            <div className="search-bar flex">
              <img className="padding-horizontal" width={20} src={search}></img>
              <form onSubmit={OnFormSubmit}>
                <input type="text" className="text-input" placeholder="Enter URL" name="value"/>
                <input type="submit" style={{display: "none"}} />
              </form>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="center-parent">
            <h2 className="align-small">Recents</h2>
          </div>
        </div>
        :
        <div className="center-parent">
          <div className="spacer"></div>
          <h4 className="center-text">astrocook</h4>
          <div className="spacer-mini"></div>
          <div className="search-bar flex">
            <img className="padding-horizontal" width={20} src={search}></img>
            <form onSubmit={OnFormSubmit}>
              <input type="text" className="text-input" placeholder="Enter URL" name="value" value={currentTextBox} onChange={OnValueUpdated}/>
              <input type="submit" style={{display: "none"}} />
            </form>
          </div>
          <div className="spacer"></div>
          <Recipe url={url}/>
        </div>
      } 
      </div>
    );
};

export default App;