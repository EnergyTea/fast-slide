import { SlideObjectType } from "../slide-object-type";

export type Rectangle = {    
    readonly id: string
    readonly leftTopX: number
    readonly leftTopY: number
    readonly width: number
    readonly height: number
    readonly type: SlideObjectType
}
