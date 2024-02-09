import React, { useState, useEffect } from "react";


const Cursor = ({src_img, show_cursor}) => {

    const [cursorX, setCursorX] = useState(0);
    const [cursorY, setCursorY] = useState(0);
    const [deviceType, setDeviceType] = useState('');
    
    // check if it is a touch device
    const isTouchDevice = () => {
        try {
        document.createEvent('TouchEvent');
        setDeviceType('touch');
        return true;
        } catch (e) {
        setDeviceType('mouse');
        return false;
        }
    };
    
    const move = (e) => {
        const touchEvent = e.touches ? e.touches[0] : null;
        const x = !isTouchDevice() ? e.clientX : touchEvent?.clientX || 0;
        const y = !isTouchDevice() ? e.clientY : touchEvent?.clientY || 0;
    
        setCursorX(x);
        setCursorY(y);
    
        // Set the cursor border's position directly
        const cursorBorder = document.getElementById('cursor-border');
        if (cursorBorder) {
        cursorBorder.style.left = `${x}px`;
        cursorBorder.style.top = `${y}px`;
        }
    };
    
        
    useEffect(() => {
        document.addEventListener('mousemove', move);
        document.addEventListener('touchmove', move);
    
        return () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
        };
    }, []);

    return (
        <div>
            <style>
                {`        
                #cursor {
                    position: absolute;
                    height: ${show_cursor ? '3rem' : '0px'};
                    width: ${show_cursor ? '3rem' : '0px'};
                    border-radius: 50%;
                    transform: translate(-50%, calc(-50% + 0.5rem));
                    pointer-events: none;
                    transition: all 0.15s ease-out;
                }

                #cursor img {
                    width: 100%;
                    height: 100%;
                }

            `}
            </style>
            <div id="cursor"
                style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
                >
                <img className="desktop-only" src={src_img} alt="" />
            </div>
        </div>
    );
};

export default Cursor;
