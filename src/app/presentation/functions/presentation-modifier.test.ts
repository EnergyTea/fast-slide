import { Presentation } from '../presentation.model';
import { Circle } from '../shared/slide-objects/circle/circle';
import { Rectangle } from '../shared/slide-objects/rectangle/rectangle';
import { Slide } from '../shared/slide/slide.model';
import * as PresentationModifier from './presentation-modifier';
import { v4 as uuidv4 } from 'uuid';
import { SlideObjectType } from '../shared/slide-objects/slide-object-type';

const BasePresentaionTitle: string = 'Без названия';

describe( 'PresentationModifier module test', () => {
    test( 'CreateEmptyPresentation returns exact object that we described', () => {
        const NewPresentation = PresentationModifier.CreateDefaultPresentation();
    
        expect( NewPresentation ).toMatchObject( {
            settings: {
            title: BasePresentaionTitle
            }
        } );

        expect( NewPresentation.slides[0] ).toMatchObject( {
            background: '#FFFFFF',
            objects: []
        } );

        expect( NewPresentation.selectedSlide ).toStrictEqual( NewPresentation.slides[0].id );
    } );

    test( 'DeserializePresentation throws SyntaxError if not serializable string provided', () => {
        expect( () => PresentationModifier.DeserializePresentation('not serializable string') ).toThrow( SyntaxError );
    } );

    test( 'AddSlide adds 1 new unique empty slide', () => {        
        let newPresentation = PresentationModifier.CreateDefaultPresentation();
        newPresentation = PresentationModifier.AddSlide( newPresentation );
        const totalSlidesCount =  newPresentation.slides.length;

        expect( newPresentation.slides[totalSlidesCount - 1] ).toMatchObject( {
            background: '#FFFFFF',
            objects: []
        } );

        expect( newPresentation.slides[0].id ).not.toStrictEqual( newPresentation.slides[1].id );        
    } );
    
    test( 'SelectSlide selects slide', () => {
        let newPresentation = PresentationModifier.CreateDefaultPresentation();
        newPresentation = PresentationModifier.SelectSlide( newPresentation, newPresentation.slides[0] );

        expect( newPresentation.selectedSlide ).toStrictEqual( newPresentation.slides[0].id );
    } );

    test( 'RemoveSlide deletes slide with provided id', () => {
        let newPresentation = PresentationModifier.CreateDefaultPresentation();
        const removableSlideId = newPresentation.slides[0].id;        
        newPresentation = PresentationModifier.RemoveSlide( newPresentation, removableSlideId );

        expect( newPresentation.slides[0] ).toBe( undefined );
    } );
    
    test( 'AddObject adds provided object on selected slide', () => {
        let newPresentation = PresentationModifier.CreateDefaultPresentation();
        const circle: Circle = {
            id: uuidv4(),
            centerX: 1,
            centerY: 1,
            radius: 1,
            type: SlideObjectType.Circle
        };
        const presentationWithCircle = PresentationModifier.AddObjectOnSlide( newPresentation, circle );
        expect( presentationWithCircle.slides[0].objects[0] ).toStrictEqual( circle );        
    } );

    test( 'Delete object from slide deletes object with provided id from selected slide', () => {
        let newPresentation = PresentationModifier.CreateDefaultPresentation();
        const circle: Circle = {
            id: uuidv4(),
            centerX: 1,
            centerY: 1,
            radius: 1,
            type: SlideObjectType.Circle
        };
        const presentationWithCircle = PresentationModifier.AddObjectOnSlide( newPresentation, circle );

        const clearedPresentation: Presentation = PresentationModifier.DeleteObject( presentationWithCircle, circle );

        expect( clearedPresentation.slides[0].objects.length ).toBe(0);
        
    } );

} );