import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './todos.module.css'
import axios from 'axios';
import Todo from '../todo/todo';
import { randomUUID } from 'crypto';

type InputParams = {
  id?: String
}

function Todos(props: InputParams) {
  axios.defaults.withCredentials = true;
  let [dataval, setData] = useState([{}]) as any

  let frist = true;


  const handleClicks = (e: any) => {
    let ele = e.target.textContent;
    let todos = document.querySelectorAll("#todosList nav") as any;
    let todo = document.querySelectorAll("#todosList main input") as any;

    if(ele == "All") {
      for(let i = 0; i < todos.length; i++) {
        todos[i].style.display = "flex"
      }
    }
    if(ele == "Active") {
      for(let i = 0; i < todos.length; i++) {
        todos[i].style.display = "flex"
        if(todo[i].checked == true) {
          todos[i].style.display = "none"
        }
      }
    } 
    if(ele == "Completed") {
      for(let i = 0; i < todos.length; i++) {
        todos[i].style.display = "flex"
        if(todo[i].checked == false) {
          todos[i].style.display = "none"
        }
      }
    }
  }

  const getTodos = () => {
    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/todo/${window.localStorage.getItem("id")}`).then((response) => {
      if(frist == true) {
        setData(response.data)
        frist = false
      }
    }).catch((error) => {
      // console.log(error)
    });
  }

  const items = () => {
    // let todo = document.querySelectorAll("#todosList main input") as any
    let itemsCounter = 0;
    // for(let i = 0; i < todo.length; i++) {
    //   if(todo[i].checked == false) {
    //     itemsCounter++
    //   }
    // }
    Object.entries(dataval).map((key: any, i: any) => {
      if(key[1].checked == false) {
        itemsCounter = itemsCounter + 1
      }
    })
    return itemsCounter
  }

  const clear = () => {
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/todo/all/${window.localStorage.getItem("id")}`).then((response) => {
      alert("Cleared")
    }).catch((error) => {
      alert("Nothing To Clear")
    });
  }

  let ele;
  try {
    ele = Object.entries(dataval).map((key: any, i: any) => (
      <Todo key={i} name={key[1].title} checked={key[1].checked} id={key[1]._id} num={i} />
    ))
  } catch (error) {
    
  }
  // ele = Object.entries(dataval).map((key: any, i: any) => (
  //   <Todo name={key[1].title} checked={false} id={key[1]._id} num={i} />
  // ))

  useEffect(() => {
    getTodos()
  }, [])

  // console.log(dataval)

  // console.log(dataval, "dataval")
  return (
    <div id={"todos_con"} className={styles.con}>
      <div id={"todosList"}>
        {ele}
      </div>
      <header className={styles.header}>
        <p id={"counter"}>{items()}</p>
        <div>
          <span onClick={handleClicks}>All</span>
          <span onClick={handleClicks}>Active</span>
          <span onClick={handleClicks}>Completed</span>
        </div>
        <p className={styles.p} onClick={clear}>Clear Completed</p>
      </header>
    </div>
  )
}

export default Todos;