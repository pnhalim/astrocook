import React, { useState } from "react";
import Cursor from './Cursor';              // TODO
import './Steps.css';

import up from './img/up-arrow.png';
import down from './img/down-arrow.png';
import left from './img/left-arrow.png';
import right from './img/right-arrow.png';


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
        <div className="center-parent columns-desktop-flex">
            <div className="prev-step center-parent" onClick={OnBackButtonClicked}>
                <button style={ { display: index > 0 ? 'block' : 'none' } }onClick={OnBackButtonClicked} className="arrow center-parent">
                    <img className="mobile-only" src={up} alt="previous" />
                    <img className="desktop-only" src={left} alt="previous" />
                </button>
            </div>
            <div className="card middle align-small">
                <h2>Step {index + 1}</h2>
                <p dangerouslySetInnerHTML={{ __html: steps[index].description}}></p>
                {
                    image !== "" && <div className="center-parent">
                        <div className="spacer-mini-mini"></div>
                        <img className="StepImage" src={steps[index].image} alt={`image of step ${index + 1}`} />
                    </div>
                }
            </div>
            <div className="next-step center-parent" onClick={OnNextButtonClicked}>
                <button style={ { display: index < steps.length-1 ? 'block' : 'none' } } onClick={OnNextButtonClicked} className="arrow center-parent">
                    <img className="mobile-only" src={down} alt="next" />
                    <img className="desktop-only" src={right} alt="next" />
                </button>
            </div>
        </div>
    );
};

export default Steps;