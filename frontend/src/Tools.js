import React from "react";
import Checkbox from '@mui/material/Checkbox';


const Tools = ({tools}) => {
    return (
        <div>
            <div className="spacer-mini-mini"></div>
            <h3>Tools</h3>
            {tools.map(tool => (
                <div key={tool}>
                    <Checkbox  
                        size="small"
                        onChange={(e) => {
                            console.log("checkbox pressed");
                            // TODO will changed
                        }}
                        style={{ padding: "0 0.4rem 0.1rem 0"}}/> 
                        {`${tool}`}
                </div>
            ))}
        </div>
    );
};

export default Tools;