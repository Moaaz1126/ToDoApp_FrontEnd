import { InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './taskForm.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Checkbox from '../checkbox/checkbox';

type InputParams = {
  id: any,
  num: any
}

function TaskForm(props: InputParams) {
  const Router = useRouter();
  axios.defaults.withCredentials = true;

  const CheckBOXComponent = () => <Checkbox type={false} check={0} onClick={true} disabled={true}/>;

  const HandleSave = (input: any) => {
    let date = new Date();
    let today = date.toLocaleDateString();
    // console.log({
    //   title: input.value,
    //   checked: false,
    //   date: today,
    //   user: props.id
    // })
    axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/todo`, {
      title: input.value,
      checked: false,
      date: today,
      user: props.id
    })
    .then(function (response) {
      // console.log(response.data)
      if(response.status == 200) {
        HandleAdd(response.data, input)
      }
    })
    .catch(function (error) {
      // console.log(error)
    });
  }

  const HandleAdd = (res: any, input?: any) => {
    let body = document.querySelector("#body") as any | null
    // console.log("handle Add")
    input.value = ""
    Router.push('./');
  }

  useEffect(() => {
    let inp = document.querySelector("#FormInput") as any | null
    inp.addEventListener("keypress", function(event: any) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // console.log("enter?")
        HandleSave(inp)
      }
    });
  }, [])

  return (
    <main id={"TaskForm"} className={styles.main}>
      <CheckBOXComponent />
      <input id={"FormInput"} type="text"  placeholder='Todo?'/>
    </main>
  )
}

export default TaskForm;