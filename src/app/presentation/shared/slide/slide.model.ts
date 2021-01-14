import { Circle } from "../slide-objects/circle/circle";
import { Rectangle } from "../slide-objects/rectangle/rectangle";

export type Slide = {
    readonly id: string

    //might become settings obj
    readonly background: string
    
    readonly objects: any[]    
}
