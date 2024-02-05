import React from "react";
import Ingredients from "./Ingredients";
import Tools from "./Tools";


const RecipeCard = ({title, author, url, servings, time, description, ingredients, tools, image, OnStartPressed}) => {

    return (
        <div className="card">
            <div className="spacer-mini-mini"></div>

            <div className="columns-desktop">
                <div className="center-parent">
                    <div className="underline center-text">
                        <h2>{title}</h2>
                    </div>
                    <div className="flex-wrap">
                        {author && <div className="capsule">Recipe by {author}</div>}
                        <div className="capsule"><a href={url} target="_blank">Link to Original</a></div>
                        {servings && <div className="capsule">Serves {servings}</div>}
                    </div>
                    <div className="spacer-mini-mini"></div>
                    <div className="columns center-text">
                        <div className="center-parent">
                            <h3 className="fade">Prep Time</h3>
                            <div className="capsule">{time.prep}</div>
                        </div>
                        <div className="center-parent">
                            <h3 className="fade">Cook Time</h3>
                            <div className="capsule">{time.cook}</div>
                        </div>
                    </div>
                    <div className="spacer-mini"></div>
                    <img src={image} alt={`image of ${title}`} />
                    <div className="spacer-mini-mini"></div>
                    <p className="center-text">{description}</p>
                    <div className="underline mobile-only"></div>
                </div>
                <div className="vertical-line"></div>
                <div>
                    {ingredients && <Ingredients ingredients={ingredients}/>}
                    {tools && <Tools tools={tools} />}
                    <div className="spacer"></div>
                    <button onClick={OnStartPressed} className="align-right">Start!</button>
                </div>
            </div>
            



            
            
        </div>
    );
};

export default RecipeCard;