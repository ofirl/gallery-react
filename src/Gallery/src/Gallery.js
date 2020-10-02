import React, { useMemo, useState } from 'react';
import { useSpring } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { useDrag } from 'react-use-gesture';

import GallerySlide from './components/GallerySlide/GallerySlide';
import useDimensions from './CustomHooks/useDimensions';

import baseConfig from './defaultConfigs/baseConfig';
import coverflowBaseConfig from './defaultConfigs/coverflowEffect';

import './sass/Gallery.sass';

const effectBaseConfigs = {
    coverflow: coverflowBaseConfig
};

const Gallery = ({ children, initialSlide = 1, styleConfig: styleConfigOverride, effect = 'coverflow', enableDragging }) => {
    const [currentSlide, setCurrentSlide] = useState(initialSlide);

    const [isDragged, setIsDragged] = useState(false);
    const [dragOffset, setDragOffset] = useState(initialSlide);

    const [galleryContainerRef, galleryDimensions, galleryNode] = useDimensions();

    const config = useMemo(() => ({
        // base
        ...baseConfig,
        // effects
        [effect]: effectBaseConfigs[effect],
        // overrides
        ...styleConfigOverride
    }), [styleConfigOverride, effect]);

    const dragBind = useDrag(({ event, movement: [movementX, _], initial, first, last, swipe, tap, ...others }) => {
        if (!tap) {
            event.stopPropagation();
        }

        if (first)
            setIsDragged(true);

        if (last) {
            setIsDragged(false);
            // setDragOffset(0);
            return;
        }

        setDragOffset(movementX);
    }, {
        axis: 'x',
        filterTaps: true,
    });

    const dragBindProps = useMemo(() => config.enableDragging ? dragBind() : null,
        [dragBind, config.enableDragging]
    );

    const styleCssVariables = useMemo(() => {
        // general
        let general = {
            '--gallery-width': galleryDimensions.width,
            '--slide-width': config.slideWidth,
            '--column-gap': config.columnGap,
            '--base-slide-offset': config.centeredItems ? `${galleryDimensions.width / 2}px` : '0px'
        };

        // effects
        let effects = {
            '--coverflow-rotation': config.coverflow.rotation + "deg",
            '--coverflow-scaleFactor': config.coverflow.scaleFactor
        };

        return {
            ...general,
            ...effects,
        };
    }, [config, galleryDimensions.width])

    const springProps = isDragged ?
        {
            to: { dragOffset: dragOffset },
            config: { tension: 10000, clamp: true },
        } : {
            to: { dragOffset: 0 }
        };

    return (
        <Spring
            {...springProps}
        >
            {({ dragOffset: dragOffsetAnimated }) => (
                <div ref={galleryContainerRef} {...dragBindProps} className={"gallery-container"} style={{ ...styleCssVariables }}>
                    {children.map((c, idx) => <GallerySlide key={idx} config={config} slideOffset={idx - currentSlide + dragOffsetAnimated / config.slideWidth}> {c} </GallerySlide>)}
                </div>

            )}
        </Spring>
    );
}

export default Gallery;