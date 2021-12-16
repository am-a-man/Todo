import React, {useState} from "react"
import Project from "./Project"
import "./Workspace.css"

export default function Workspace() {

    const [projectList, setProjectList] = useState([])
    const [projectName, setProjectName] = useState("")
    const projectIdList = []

    console.log(projectList);

    function handleSubmit(event) {
        event.preventDefault();
        
        if(event.target["projectName"].value === '')
            return 
        
        setProjectList(prevList => {
            return ([
                ...prevList,
                {
                    id: projectIdList.length === 0 ? prevList.length : projectIdList[projectIdList.length-1],
                    name: projectName
                }
            ])
        })
        setProjectName("");
        projectIdList.pop();

    }

    function exitProject(id) {
        console.log("setting")
        setProjectList(prevList => {

            let projectArr = [];
            for(let i=0;i<projectList.length;i++)
            {
                if(projectList[i].id === id)
                {
                    projectIdList.push(id);
                }
                else
                {
                    projectArr.push(projectList[i]);
                }
            }

            return projectArr;
        })

        
    }

    const projectListElement = projectList.map(projectItem => {
        return (
            <Project 
                key = {projectItem.id}
                name = {projectItem.name}
                handleExitProject = {() => exitProject(projectItem.id)}
            />
        )
    })

    function handleChange(event) {
        setProjectName(event.target.value);
    }

    return (
        <div className="workspace--window">
            {projectList.length !==0 && projectListElement}
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="enter project name"
                    name="projectName"
                    value={projectName}
                    onChange={handleChange}
                />

                <button>
                    +
                </button>
            </form>
        </div>
    );
}