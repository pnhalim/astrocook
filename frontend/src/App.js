import React, { useState } from "react";
import Recipe from "./Recipe";

const App = () => {

  const [url, setUrl] = useState("");

  const OnFormSubmit = (e) => {
    e.preventDefault();
    setUrl(e.target.value.value);
  }

    return (
      <div>
      {
        url === "" ?
        <div>
          <div className="hi"></div>
          <h1 className="hi2">Astrocook!</h1>
          <form className="hi3" onSubmit={OnFormSubmit} >
            <input type="text" className="text-input h4" placeholder="URL" name="value"/>
            <br></br>
            <input className="hi5" type="submit" value="Go!"/>
          </form>
        </div>
        :
        <Recipe url={url}/>
      } 
      </div>
    );
};

export default App;