import { useEffect, useRef } from 'react';
import styles from './darkSwitch.module.css'

function SwitchDev() {

  const handleClick = (e: any) => {
    // console.log(e)
    const body = document.querySelector("body") as any | null;
    if(e.target.checked == true) {
      body.style.color = "white"
      body.style.backgroundColor = "#181824"
      try {
        let tasks = document.querySelector("#todos_con") as any;
        tasks.style.background = "#25273c"
        let taskForm = document.querySelector("#TaskForm") as any;
        let taskFormInp = document.querySelector("#FormInput") as any;
        taskForm.style.background = "#25273c"
        taskFormInp.style.background = "#25273c"
      } catch (error) {
        
      }
      window.localStorage.setItem("switch", "dark")
    } else {
      body.style.color = "black"
      body.style.backgroundColor = "#fafafa"
      window.localStorage.setItem("switch", "white")
      
      try {
        let tasks = document.querySelector("#todos_con") as any;
        tasks.style.background = "white"
        let taskForm = document.querySelector("#TaskForm") as any;
        let taskFormInp = document.querySelector("#FormInput") as any;
        taskForm.style.background = "white"
        taskFormInp.style.background = "white"
      } catch (error) {
        
      }
    }
  }

  let ele  = useRef(null) as any
  useEffect(() => {
    const body = document.querySelector("body") as any | null;

    if(window.localStorage.getItem("switch") == "dark") {
      body.style.color = "white"
      body.style.backgroundColor = "#181824"
      ele.current.checked = true
      
      try {
        let tasks = document.querySelector("#todos_con") as any;
        tasks.style.background = "#25273c"
        let taskForm = document.querySelector("#TaskForm") as any;
        let taskFormInp = document.querySelector("#FormInput") as any;
        taskForm.style.background = "#25273c"
        taskFormInp.style.background = "#25273c"
      } catch (error) {
        
      }
    } else {
      body.style.color = "black"
      body.style.backgroundColor = "rgb(243 243 243)"

      try {
        let tasks = document.querySelector("#todos_con") as any;
        tasks.style.background = "white"
        let taskForm = document.querySelector("#TaskForm") as any;
        let taskFormInp = document.querySelector("#FormInput") as any;
        taskForm.style.background = "#white"
        taskFormInp.style.background = "#white"
      } catch (error) {
        
      }
    }
  }, [])

  return (
    <input ref={ele} onClick={handleClick} placeholder='checkbox' id="toggle" className={styles.toggle} type="checkbox" />
  )
}

export default SwitchDev;