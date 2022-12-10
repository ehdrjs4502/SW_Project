import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return(
        <div>
            <h2>404 NotFound</h2>
            <Link to="/">메인페이지로 돌아가기</Link>    
        </div>

    )
}


export default NotFound; 