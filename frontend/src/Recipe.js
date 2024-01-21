import React, { useState, useEffect } from "react";
import Ingredients from "./Ingredients";
import Tools from "./Tools";
import Steps from "./Steps";

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
    const [images, setImages] = useState("");

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
                    setImages(data.result.images);   
                    setLoaded(true);       
                }
            })
            .catch((error) => console.log(error));
    
        return () => {
            ignoreStaleRequest = true;
        };
    }, [url]);
    
    const OnStartPressed = (e) => {
        setStarted(!started);
    }

    return (
        <div className="Recipe">
            {
            loaded ? 
                // Started
                (started ?
                    <div>
                        {/* <div className="column">
                            
                        </div> */}
                        <div>
                            <Steps steps={instructions} ingredients={ingredients} />
                        </div>
                    </div>
                :
                // Landing page
                    <div>
                        <div>
                        <h1>Recipe Found!</h1>
                            <div className="columns2">
                                <div>
                                <h2>{title}</h2>
                                <h3>Ingredients</h3>
                                <Ingredients ingredients={ingredients}/>
                                {tools && 
                                <div>
                                    <h3>Tools</h3>
                                <Tools tools={tools}/>
                                </div>}
                                </div>
                                <div>
                                    <div className="spacer"></div>
                                <img className="RecipeImage" src={images} alt={`image of ${title}`} />
                                </div>
                            </div>
                        </div>
                        <div className="spacer"></div>
                        <div>
                            <button onClick={OnStartPressed} className="button-19">Start!</button>
                        </div>
                    </div>)
            :
            // Loading
            <h1>Loading...</h1>
            }

        </div>
    );
};

export default Recipe;