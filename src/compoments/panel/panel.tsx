
import React, { RefObject, useEffect, useState } from 'react'
import './style.less'
import Toolbar from '../toolbar/toolbar'
import DrawTool from '../../utils/canvas'
import { drawData } from '../../utils/types'

function Panel(){
    const [win, updateWin] = useState({
        width: 0,
        height: 0
    })
    const [count, updateCount] = useState(1)
    const [color, updateColor] = useState("#000000")
    const [scaleHeight, updateScaleHeight] = useState(1)
    const [scaleWidth, updateScaleWidth] = useState(1)
    const [drawTool, updateDrawTool] = useState(new DrawTool(null))
    const [isMouseDown, updateMouseDown] = useState(false)
    const canvasRef:RefObject<HTMLCanvasElement> = React.createRef()
    const [canvasState] = useState(canvasRef)
    useEffect(() => {
        window.addEventListener("resize", ()=>{
            if( win.width > 0 ) {
                updateScaleWidth(win.width / window.innerWidth)
                updateScaleHeight(win.height / window.innerHeight)
            }
        })
        return function(){
            window.removeEventListener("resize", function(){})
        }
    }, [win] )
    useEffect(() => {
        updateWin({
            width:window.innerWidth,
            height:window.innerHeight
        })
        if ( canvasState.current !== null ) {
            updateDrawTool(new DrawTool(canvasState.current))
        }
    }, [canvasState]);
    const startMouseDown = ():void=>{
        updateMouseDown(true)
        updateCount(1)
    }
    const zoomSize = (senData:drawData):drawData=>{
        senData.x = Math.round(senData.x * scaleWidth)
        senData.y = Math.round(senData.y * scaleHeight)
        return senData;
    }
    const startMouseUp = ():void=>{
        updateMouseDown(false)
        updateCount(1)
        drawTool.cleanPoint()
    }
    const sendData = (senData:drawData):void =>{
        const isReady = drawTool.isReady()
        if ( isReady === true && count % 2 === 0 ) {
            drawTool.line(senData)
        }
        updateCount( count+1 )
    }
    const unpack = (x:number, y:number): drawData =>{
        return zoomSize({
            x:x,
            y:y,
            n:2,
            c:color
        })
    }
    return (
        <>
            <div className='panel-background' >
                <canvas ref={canvasRef}
                    onMouseDown={startMouseDown}
                    onTouchStart={startMouseDown}
                    onMouseUp={startMouseUp}
                    onTouchEnd={startMouseUp}
                    onMouseLeave={startMouseUp}
                    onTouchCancel={startMouseUp}
                    onMouseMove={(e)=>{
                        if ( isMouseDown === true ) {
                            sendData( unpack( e.pageX, e.pageY ) )
                        }
                    }}  
                    onTouchMove={(e)=>{
                        e.preventDefault(); 
                        if ( isMouseDown === true ) {
                            sendData( unpack( e.touches[0].clientX, e.touches[0].clientY ) )
                        }
                    }} 
                    width={win.width} height={win.height}  >
                </canvas>
                <Toolbar updateColor={updateColor} drawTool={drawTool} win={win} />
            </div>
        </>
    )
}
export default Panel