import { SlideObjectType } from "../slide-object-type";

export type Circle = {    
    readonly id: string
    readonly centerX: number
    readonly centerY: number
    readonly radius: number
    readonly type: SlideObjectType
}
