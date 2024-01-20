import React, { useState, useEffect } from "react";

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
        <div className="Steps">
            <h1>Step {index + 1}</h1>
            <div className="StepContent">
                {
                    image !== "" ?
                    <div className="columns">
                        <img className="StepImage" src={steps[index].image} alt={`image of step ${index + 1}`} />
                        <p dangerouslySetInnerHTML={{ __html: steps[index].description}}></p>
                    </div>
                    :
                    <p dangerouslySetInnerHTML={{ __html: steps[index].description}}></p>
                }
            </div>
            <div className="columns2">
                <div>
                    <button style={ { display: index > 0 ? 'block' : 'none' } }onClick={OnBackButtonClicked} className="button-19">Back!</button>
                </div>
                <div>
                    <button style={ { display: index < steps.length-1 ? 'block' : 'none' } } onClick={OnNextButtonClicked} className="button-19">Next!</button>
                </div>
            </div>
        </div>
    );
};

export default Steps;