import { PresentationSettings } from './shared/presentation-settings/presentation-settings'
import { Slide } from './shared/slide/slide.model'
import * as PresentationModifier from './functions/presentation-modifier'
import { Circle } from './shared/slide-objects/circle/circle'
import { Rectangle } from './shared/slide-objects/rectangle/rectangle'

export type Presentation = {    
    readonly settings: PresentationSettings;
    readonly slides: Array<Slide>;
    //store id
    readonly selectedSlide: string;
}
