import Cookies from 'js-cookie';
import React from 'react';

function startRecipe() {
    console.log("pog");
}

export default function RecentList() {
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
                onClick={startRecipe}>
                    <h3>{item["name"]}</h3>
                    <p><a href={item["url"]}>{item["url"]}</a></p>
                </button>
            </ul>
        );
        return recentList;
    }
}
