import React from 'react';

const MouseBlocker = () => {
    const blockMouse = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div className="gallery-mouse-blocker" onClick={blockMouse} />
    );
}

export default MouseBlocker;