import React from 'react';
import "./styles.css"

const imageStyle = {
    borderRadius: '50%',
    height: '200px'
}
const textStyle = {
    backgroundColor: 'rgb(220,220,220)'
}

const ReviewCard = ({ userName , userImage , text }) => {

    return(
        <div className="card mt-5 " style={textStyle}>
        <div className="row no-gutters">
            <div clclassNameass="col-auto mt-2">
                <img src={userImage} style={imageStyle} class="img-fluid" alt="" /> 
            </div>
            <div className="col">
                <div className="card-block px-2">
                    <h5 className="card-title">{userName}:</h5>
                    <p className="card-text text-muted" >{text}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export { ReviewCard }