import clsx from 'clsx';
import React, { useMemo } from 'react';

const GallerySlide = ({ children, config, slideOffset }) => {
    const slideCssVariables = useMemo(() => ({
        '--slide-offset': slideOffset,
        '--slide-offset-abs': Math.abs(slideOffset),
    }), [slideOffset]);

    return (
        <div className={clsx("gallery-slide", { 'gallery-slide-active': slideOffset === 0 })}
            style={{ ...slideCssVariables, width: config.slideWidth + "px" }}>
            {children}
        </div>
    );
}

export default GallerySlide;