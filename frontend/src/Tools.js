import React, { useState, useEffect } from "react";

const Tools = ({tools}) => {
    return (
        <div className="Tools">
            <div>
                <ul>
                    {tools.map(tool => (
                        <li className="ingredient_list" key={tool}>{tool}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Tools;