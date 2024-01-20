import React, { useState, useEffect } from "react";

const Ingredients = ({ingredients}) => {
    return (
        <div className="Ingredients">
            <div>
                <ul>
                    {ingredients.map(ingredient => (
                        <li className="ingredient_list" key={ingredient.name}>{ingredient.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Ingredients;