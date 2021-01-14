import { Presentation } from "./presentation/presentation.model";
export * from './history/history';
import * as PresentationModifier from './presentation/functions/presentation-modifier'

export class Application {        
    constructor( 
        private Presentation: Presentation = PresentationModifier.CreateDefaultPresentation()
     ) { }

     GetPresentation(): Presentation {
         return this.Presentation;
     }
}