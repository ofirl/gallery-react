import React, { useEffect } from 'react';
import useDimensions from '../../CustomHooks/useDimensions';

const MeasurePixelSize = ({ width, height, onChange }) => {
    const [divRef, divDimensions] = useDimensions();

    useEffect(() => {
        onChange && onChange({
            width: divDimensions.width,
            height: divDimensions.height,
        });
    }, [divDimensions, onChange])

    return (
        <div ref={divRef} style={{ position:'absolute', visibility: 'hidden', zIndex: '-1000', width: width, height: height }} />
    );
}

export default MeasurePixelSize;