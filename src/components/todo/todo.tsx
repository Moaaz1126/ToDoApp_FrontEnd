import { InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './todo.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Checkbox from '../checkbox/checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type InputParams = {
  name: any,
  checked: any,
  id: any,
  num: any
}

function taskForm(props: InputParams) {
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const handleSave = (input: any) => {
    let date = new Date();
    let today = date.toLocaleDateString();

    axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/api/todo/${window.localStorage.getItem("id")}`, {
      checked: false
    })
    .then(function (response) {
      // console.log(response.data)
      if(response.status == 200) {
        // console.log(200)
      }
    })
    .catch(function (error) {
      // console.log(error)
    });
  }

  const handleDelete = () => {
    let _id = props.id
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/api/todo/one/${_id}`).then(function (response) {
      // console.log()
      if(response.status == 200) {
        // console.log(response)
        router.push('/');
      }
    })
    .catch(function (error) {
      // console.log(error)
    });
  }

  const CheckBOXComponent = () => <Checkbox type={props.checked} check={props.num} onClick={true} />;

  useEffect(() => {

  }, [])

  return (
    <nav className={styles.mainTodo} id={"mainTodo"} data-id={props.id}>
      <Checkbox type={props.checked} check={props.num} onClick={true} disabled={false}/>
      <p>{props.name}</p>
      <FontAwesomeIcon onClick={handleDelete} className={styles.i} icon={faXmark} />
    </nav>
  )
}

export default taskForm;