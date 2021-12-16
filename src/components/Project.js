import React, {useState} from "react";
import Task from "./Task"
import "./Project.css"


export default function Project(props) {

    const [taskValue, setTaskValue] = useState("");
    const [taskList, setTaskList] = useState([])

    function handleChange(event) {
        setTaskValue(event.target.value)
    }   

    const [indices, setIndices] = useState([])

    function handleSubmit(event) {
        event.preventDefault();
        
        if(taskValue === "")
            return ;
   
        setTaskList(prevData => { 
            return [
            ...prevData, 
            {
                id: indices.length !== 0 ? indices[indices.length-1] : taskList.length, 
                data: taskValue
            }
        ]})
        if(indices.length !== 0)
            setIndices(prevData => {
                var idxArr = [...prevData];
                idxArr.pop();
                return idxArr;
            })
        setTaskValue("");
    }

    
  

    function onTaskExit(id) {
        setTaskList(prevList => {
            const itemList = []
            for(let i=0;i<prevList.length;i++)
            {
                if(prevList[i].id!==id)
                    itemList.push(prevList[i]);
                else {
                    setIndices(prevList => ([...prevList, id]))
                }
            }
            return itemList;
        })
    }

    return (
        <div className="project--card">
            <h4>{props.name}</h4> 
            <button onClick={props.handleExitProject}> X </button>
            <form>
                <input 
                    type="text" 
                    placeholder="enter task"
                    value={taskValue}
                    onChange={handleChange}
                    name="taskValue"
                    autoComplete="off"
                />
                <button onClick={handleSubmit}>+</button>
            </form>
            {taskList.length !== 0 && taskList.map(dataVal => 
                        <Task 
                        key={dataVal.id}
                            className="project--task-card"  
                            data={dataVal.data}
                            handleExit={() => onTaskExit(dataVal.id)}
                        />)}

        </div>

    );
}