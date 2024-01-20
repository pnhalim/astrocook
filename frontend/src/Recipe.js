import React, { useState, useEffect } from "react";

const Recipe = ({url}) => {

    const [loaded, setLoaded] = useState(false);
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

    useEffect((url) => {
        let ignoreStaleRequest = false;
        url = 'https://www.allrecipes.com/recipe/83549/angelas-awesome-enchiladas/'
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
    

    return (
        <div>
            {
            loaded ? 
            <div>
                <h1>Recipe Found!</h1>
                <h2>{title}</h2>
            </div>
            :
            <h1>Loading...</h1>
            }

        </div>
    );
};

export default Recipe;