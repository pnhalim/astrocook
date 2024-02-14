import Cookies from 'js-cookie';
import React from 'react';



export default function RecentList({setUrl, setCurrentTextBox}) {
    function startRecipe(url) {
        setUrl(url);
        setCurrentTextBox(url);
    }

    const cookie = Cookies.get("recent");
    if(cookie == null) {
        return
    } 
    else {
        let cookieList = JSON.parse(cookie);
        const recentList = cookieList.toReversed().map(item =>
            <ul className="recent-list-item" key={item["url"]}>
                <button
                className="recent-item"
                onClick={()=>{
                    let item_url = item["url"]
                    startRecipe(item_url)
                }}
                >
                    <h3>{item["name"]}</h3>
                    <p><a href={item["url"]}>{item["url"]}</a></p>
                </button>
            </ul>
        );
        return recentList;
    }
}
