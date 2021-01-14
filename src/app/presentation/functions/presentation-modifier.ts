import { Presentation } from '../presentation.model';
import { Circle } from '../shared/slide-objects/circle/circle';
import { Rectangle } from '../shared/slide-objects/rectangle/rectangle';
import { Slide } from '../shared/slide/slide.model';
import { v4 as uuidv4 } from 'uuid';

const BasePresentaionTitle = 'Без названия';

function CreateDefaultPresentation(): Presentation {
    const newSlide: Slide = {
        id: uuidv4(),
        background: '#FFFFFF',
        objects: []
    };

    const newPresentation: Presentation = {
        settings: {
            title: BasePresentaionTitle,                        
        },
        slides: new Array<Slide>( newSlide ),
        selectedSlide: newSlide.id
    };

    return newPresentation;
};

function DeserializePresentation( presentationJson: string ): Presentation {    
    try {
        const presentation: Presentation = JSON.parse( presentationJson );
        return presentation;
    } catch ( exception ) {
        throw exception;
    };
};

function SerializePresentation( presentation: Presentation ): string { 
    try {
        const presentationJSON = JSON.stringify( presentation );
        return presentationJSON.replace(/\\n/g, "\\n")
                               .replace(/\\'/g, "\\'")
                               .replace(/\\"/g, '\\"')
                               .replace(/\\&/g, "\\&")
                               .replace(/\\r/g, "\\r")
                               .replace(/\\t/g, "\\t")
                               .replace(/\\b/g, "\\b")
                               .replace(/\\f/g, "\\f");
    } catch ( exception ) {
        throw exception;
    };
};

function ChangePresentationName( presentation: Presentation, newTitle: string ): Presentation {
    return {...presentation,
        settings: {
            title: newTitle
        }
    }
}

function AddSlide( presentation: Presentation ): Presentation {
    throwErrorIfPresentationNullOrUndefined( presentation );

    const newSlide: Slide = getNewSlide( presentation );    

    let newPresentation: Presentation = {
        settings: {
            title: presentation?.settings?.title ?? BasePresentaionTitle            
        },
        slides: presentation?.slides ?? new Array<Slide>(),
        selectedSlide: newSlide.id
    };

    newPresentation.slides.push( newSlide );

    return newPresentation;
};

function SelectSlide( presentation: Presentation, selectedSlide: Slide ): Presentation {
    throwErrorIfPresentationNullOrUndefined( presentation );

    let newPresentation: Presentation = {
        settings: {
            title: presentation?.settings?.title ?? BasePresentaionTitle            
        },
        slides: presentation?.slides ?? new Array<Slide>( selectedSlide ),
        selectedSlide: selectedSlide.id
    };    

    return newPresentation;
};

function RemoveSlide( presentation: Presentation, removableSlideId: string ): Presentation {   
    throwErrorIfPresentationNullOrUndefined( presentation );

    let newPresentation: Presentation = {
        settings: {
            title: presentation?.settings?.title ?? BasePresentaionTitle
        },
        slides: presentation?.slides?.filter( s => s.id !== removableSlideId ) ?? new Array<Slide>(),
        selectedSlide: presentation?.selectedSlide ?? null
    };

    return newPresentation;
};

function AddObjectOnSlide( presentation: Presentation, object: Circle | Rectangle): Presentation { 
    throwErrorIfPresentationNullOrUndefined( presentation );

    const newSlide: Slide = getNewSlide( presentation );

    let newPresentation: Presentation = {
        settings: {
            title: presentation?.settings?.title ?? BasePresentaionTitle
        },
        slides: presentation?.slides ?? new Array<Slide>( newSlide ),
        selectedSlide: presentation?.selectedSlide
    };
    
    pushObject( newPresentation, object );

    return newPresentation;
};

function DeleteObject( presentation: Presentation, object: Circle | Rectangle ): Presentation {
    throwErrorIfPresentationNullOrUndefined( presentation );

    return {
        ...presentation,
        slides: presentation.slides.map( s => {
            return {
                ...s,
                objects: s.objects.filter( o => o.id !== object.id )
            }
        } )
    }    
};

function getNewSlide( presentation: Presentation ): Slide {
    throwErrorIfPresentationNullOrUndefined( presentation );

    const newSlide: Slide = {
        id: uuidv4(),
        background: '#FFFFFF',
        objects: []
    };

    return newSlide;
};

function pushObject( presentation: Presentation, object: Circle | Rectangle ): void {
    throwErrorIfPresentationNullOrUndefined( presentation );

    let selectedSlide: Slide = presentation.slides.filter( o => o.id === presentation.selectedSlide )[0];
    selectedSlide.objects.push( object );
};

function throwErrorIfPresentationNullOrUndefined( presentation: Presentation ): void {
    if ( ( presentation === null ) || ( presentation === undefined ) )
    {
        throw Error('Provided null or undefined object instead of presentation body')
    };
};

export {
    CreateDefaultPresentation,
    DeserializePresentation,
    SerializePresentation,
    ChangePresentationName,
    AddSlide,
    SelectSlide,
    RemoveSlide,
    AddObjectOnSlide,    
    DeleteObject
};
