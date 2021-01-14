import React from 'react'

export default function SlideView( props: any ) {
    let slide = props;

    return (        
        <canvas>
            {slide}
        </canvas>
    )
}