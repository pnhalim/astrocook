import React, { useState, useEffect } from "react";
import Steps from "./Steps";
import RecipeCard from "./RecipeCard";
import Cookies from 'js-cookie';
import { RecentSearch } from "./cookieModels"

const Recipe = ({url}) => {

    const [loaded, setLoaded] = useState(false);
    const [started, setStarted] = useState(false); 
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [tools, setTools] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [servings, setServings] = useState("");
    const [time, setTime] = useState({});
    const [nutrition, setNutrition] = useState({});
    const [image, setImage] = useState("");

    useEffect(() => {
        let ignoreStaleRequest = false;
        let api_url = `http://localhost:8000/api/recipe/?url=${url}`

        fetch(api_url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
          })
          .then((data) => {
                if (!ignoreStaleRequest) {
                    setIngredients(data.result.ingredients);
                    setInstructions(data.result.instructions);
                    setTools(data.result.tools);
                    setTitle(data.result.title);
                    setDescription(data.result.description);
                    setAuthor(data.result.author);
                    setServings(data.result.servings);
                    setTime(data.result.time);
                    setNutrition(data.result.nutrition);
                    setImage(data.result.image);   
                    setLoaded(true);   

                    console.log(data.result);
                }
            })
            .catch((error) => console.log(error));
    
        return () => {
            ignoreStaleRequest = true;
        };
    }, [url]);
    
    const OnStartPressed = (e) => {
        let cookie = Cookies.get("recent");
        let cookieList;
        if(cookie == null) {
            cookieList = [new RecentSearch(title, url, time)]
        }
        else {
            cookieList = JSON.parse(cookie);
            for(let i = 0; i < cookieList.length; i++) {
                if(cookieList[i]["url"] == url) {
                    cookieList.splice(i, 1);
                }
            }
            cookieList.push(new RecentSearch(title, url, time))
        }
        Cookies.set("recent", JSON.stringify(cookieList)); 
        setStarted(!started);
    }

    return (
        <div className="align">
            {
            loaded ? 
                // Started
                (started ?
                    <div>
                        <Steps steps={instructions} ingredients={ingredients} />
                    </div>
                :
                // Landing page
                    <div>
                        <h2>Recipe Found!</h2>
                        <div className="spacer-mini"></div>
                        <RecipeCard 
                            title={title} 
                            author={author}
                            url={url} 
                            servings={servings}
                            time={time}
                            description={description}
                            ingredients={ingredients} 
                            tools={tools} 
                            image={image} 
                            OnStartPressed={OnStartPressed} 
                        />
                        <div className="spacer"></div>
                        <div className="spacer"></div>
                    </div>)
            :
            // Loading
            <h2>Astrocooking!...</h2>
            }

        </div>
    );
};

export default Recipe;