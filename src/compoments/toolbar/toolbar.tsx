import DrawTool from '../../utils/canvas'
import { updateColor, win } from '../../utils/types'
import './style.less'
function toolbar(props: 
    {
        drawTool: DrawTool, 
        win: win 
        updateColor: updateColor
    }){
    const clearCanvas = () :void => {
        console.log( props.drawTool )
        props.drawTool.clear( props.win.width, props.win.height)
    }
    const setColor = (color:string):void =>{
        props.updateColor(color)
    }
    return (
        <ul className='toolbar'>
            <li onClick={()=>setColor("rgb(38, 146, 224)")}></li>
            <li onClick={()=>setColor("rgb(208, 11, 86)")}></li>
            <li onClick={()=>setColor("rgb(11, 183, 60)")}></li>
            <li onClick={clearCanvas}></li>
        </ul>
    )
}
export default toolbar