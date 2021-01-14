import React from 'react';
import { PresentationView } from './presentation/presentation.view';
import SlideView from './presentation/shared/slide/slide.view';
import * as PresentationModifier from './presentation/functions/presentation-modifier'

export default function App() {
    const presentation = PresentationModifier.CreateDefaultPresentation();    

    return(
        <PresentationView presentation={presentation} />
    )
}