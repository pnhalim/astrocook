import React, { useState } from "react";

import up from './img/arrow-up.png';
import down from './img/arrow-down.png';


const Steps = ({steps, ingredients}) => {

    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(steps[0].image.trim());

    const OnNextButtonClicked = (e) => {
        let newIndex = Math.min(index + 1, steps.length - 1)
        setImage(steps[newIndex].image.trim())
        setIndex(newIndex)
    }

    const OnBackButtonClicked = (e) => {
        let newIndex = Math.max(index - 1, 0)
        setImage(steps[newIndex].image.trim())
        setIndex(newIndex)
    }

    return (
        <div className="center-parent">
            <div className="spacer"></div>
            <div>
                <button style={ { display: index > 0 ? 'block' : 'none' } }onClick={OnBackButtonClicked} className="arrow">
                    <img src={up} alt="up" />
                </button>
                <div className="spacer"></div>
            </div>
            <div className="card middle">
                <h2>Step {index + 1}</h2>
                <p dangerouslySetInnerHTML={{ __html: steps[index].description}}></p>
                {
                    image !== "" && <div className="center-parent">
                        <div className="spacer-mini-mini"></div>
                        <img className="StepImage" src={steps[index].image} alt={`image of step ${index + 1}`} />
                    </div>
                }
            </div>
            <div className="spacer"></div>
            <div>
                <button style={ { display: index < steps.length-1 ? 'block' : 'none' } } onClick={OnNextButtonClicked} className="arrow">
                    <img src={down} alt="down" />
                </button>
            </div>
            <div className="spacer"></div>
            <div className="spacer"></div>
        </div>
    );
};

export default Steps;