import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../css/button.css'

function ConvertBtn() {
    const [color, setColor] = useState("red")

    function onClickMapBtn(e) {
        setColor("blue")
        console.log(e.target)
        e.target.style.backgroundColor = color
    }

    function onClickChartBtn(e) {
        console.log(e.target)
        e.target.style.backgroundColor = "red"
    }


    return(
        <div>
            <Link to='/'><button onClick={onClickMapBtn} style={{backgroundColor:{color}}}>Map</button></Link>
            <Link to='/charts'><button onClick={onClickChartBtn} style={{backgroundColor:{color}}}>Chart</button></Link>
        </div>

    )

}

export default ConvertBtn;