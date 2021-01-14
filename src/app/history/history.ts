let currentPresentationVersion: string;
let presentationVersions: string[] = [];

function addVersion( newPresentationVersion: string ): void {
    presentationVersions.push( newPresentationVersion );
    currentPresentationVersion = newPresentationVersion;
}


function undo(): void { 
    if ( isUndoAvailable() )
    {
        const currentVersionIndex = getIndexOfCurrentPresentationVersion();
        currentPresentationVersion = presentationVersions[ currentVersionIndex - 1 ];
    }
}

function redo(): void { 
    if ( isRedoAvailable() )
    {
        const currentVersionIndex = getIndexOfCurrentPresentationVersion();
        currentPresentationVersion = presentationVersions[ currentVersionIndex + 1 ];
    }
}

function getPresentationVersions(): string[] {
    return presentationVersions;
}

function getCurrentPresentationVersion(): string {
    return currentPresentationVersion;
}

function clear(): void {
    currentPresentationVersion = "{}";
    presentationVersions = [];
}

function isRedoAvailable(): boolean {        
    const currentVersionIndex: number = getIndexOfCurrentPresentationVersion();
    const totalPresentationVersionsCount: number = presentationVersions.length;

    return ( ( currentVersionIndex + 1 ) < totalPresentationVersionsCount );
}

function isUndoAvailable(): boolean {    
    const currentVersionIndex: number = getIndexOfCurrentPresentationVersion();

    return ( currentVersionIndex >= 1 );
}

function getIndexOfCurrentPresentationVersion(): number {
    return presentationVersions.indexOf( currentPresentationVersion );
}

export {
    addVersion,
    undo,
    redo,
    clear,
    getPresentationVersions,
    getCurrentPresentationVersion
}
