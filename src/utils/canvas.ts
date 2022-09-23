import { drawData, formPoint } from "./types"

export default class DrawTool {
    canvas:HTMLCanvasElement | null = null
    ctx:any = undefined
    point:formPoint = {x:0,y:0}
    constructor( canvas: HTMLCanvasElement | null ){
        if ( canvas !== null ) {
            this.canvas = canvas
            if ( this.ctx === undefined ) {
                this.ctx = this.canvas.getContext("2d")
            }
        }
    }
    isReady():boolean{
        return this.canvas === null ? false : true
    }
    line( data:drawData ){
        this.setPoint(data)
        this.ctx.beginPath();
        this.ctx.moveTo(this.point.x, this.point.y);
        this.ctx.lineTo(data.x, data.y);
        this.ctx.stroke();
        this.point.x = data.x
        this.point.y = data.y
    }
    setPoint(data:drawData){
        if ( this.point.x === 0 && this.point.y === 0 ) {
            this.point.x = data.x
            this.point.y = data.y
        }
        this.setColor(data)
    }
    setColor(data:drawData){
        this.ctx.strokeStyle = data.c
    }
    cleanPoint(){
        this.point = {
            x:0,
            y:0
        }
    }
    clear(w:number, h:number){
        this.ctx.clearRect(0, 0, w, h);
    }
}