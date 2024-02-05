import React from "react";
import Checkbox from '@mui/material/Checkbox';


const Ingredients = ({ingredients}) => {
    return (
        <div>
            <h3>Ingredients</h3>
            {ingredients.map(ingredient => (
                <div key={ingredient.name}>
                    <Checkbox  
                        size="small"
                        onChange={(e) => {
                            console.log("checkbox pressed");
                            // TODO will changed
                        }}
                        style={{ padding: "0 0.4rem 0.1rem 0"}}/> 
                        {`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
                </div>
            ))}
        </div>
    );
};

export default Ingredients;