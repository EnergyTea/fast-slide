const enum PresentationMode {
    View,
    Edit
}

let selectedMode: PresentationMode = PresentationMode.Edit;

function SelectViewMode(): void {
    selectedMode = PresentationMode.View;
};

function SelectEditMode(): void {
    selectedMode = PresentationMode.Edit;
};

export {
    SelectEditMode,
    SelectViewMode    
}
