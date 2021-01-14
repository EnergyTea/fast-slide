import * as HistoryModule from './history'

const defaultVersions: string[] = [ '{Version: 1}', '{Version: 2}', '{Version: 3}', '{Version: 4}' ];
const newPresentationVersion: string = '{Version: 1}';

describe( 'History module test', () => {
    beforeEach( () => {
        HistoryModule.clear();
    } );

    test( 'History stores provided presentation version and updates currentVersion field', () => {            
        HistoryModule.addVersion( newPresentationVersion );
          
        const updatedPresentationVersions = HistoryModule.getPresentationVersions();
        const updatedCurrentPresentationVersion = HistoryModule.getCurrentPresentationVersion();
    
        expect( updatedCurrentPresentationVersion ).toBe( newPresentationVersion );
        expect( updatedPresentationVersions ).toStrictEqual( [ newPresentationVersion ] );
    } );
    
    test( 'By calling undo we set current version to previous', () => {        
        defaultVersions.forEach( version => HistoryModule.addVersion( version ) );                
    
        HistoryModule.undo();
    
        const updatedCurrentPresentationVersion = HistoryModule.getCurrentPresentationVersion();    
        expect( updatedCurrentPresentationVersion ).toBe( '{Version: 3}' );
    } );

    test( 'By calling redo we set current version to next', () => {          
        defaultVersions.forEach( version => HistoryModule.addVersion( version ) );
    
        HistoryModule.undo();
        HistoryModule.redo();
    
        const updatedCurrentPresentationVersion = HistoryModule.getCurrentPresentationVersion();    
        expect( updatedCurrentPresentationVersion ).toBe( '{Version: 4}' );
    } );
    
    test( 'Calling undo with emtpy history doesnt set current version to undefined', () => {
        HistoryModule.undo();
        expect( HistoryModule.getCurrentPresentationVersion() ).toBe( '{}' );
    } );

    test( 'Calling redo with emtpy history doesnt set current version to undefined', () => {
        HistoryModule.redo();
        expect( HistoryModule.getCurrentPresentationVersion() ).toBe( '{}' );
    } );

    test( 'Calling redo with last available version selected doesnt set it to undefined', () => {        
        defaultVersions.forEach( version => HistoryModule.addVersion( version ) );

        HistoryModule.redo();
        expect( HistoryModule.getCurrentPresentationVersion() ).toBe( '{Version: 4}' );
    } );

    test( 'Calling undo with first version selected doesnt set it to undefined', () => {        
        HistoryModule.addVersion( newPresentationVersion );

        HistoryModule.redo();
        expect( HistoryModule.getCurrentPresentationVersion() ).toBe( '{Version: 1}' );
    } );
} );
