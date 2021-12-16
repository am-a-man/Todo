import React from "react";
import "./Task.css"


export default function Task(props) {
    const data = props.data;
    const handleExit = props.handleExit;
    

    function handleDropDown() {

    }

    return (
        <div className={`task--card`}> 
            <h4>{data}</h4>
            <button onClick={handleExit}>X</button>
        </div>
    );
    // <button onClick={handleDropDown}>...</button>

}