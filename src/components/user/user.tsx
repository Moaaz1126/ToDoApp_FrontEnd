import { InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './user.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons'

type InputParams = {
  name: String
}

function User(props: InputParams) {
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const handleClick = (e: any, type?: any) => {
    axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/user/logout`, {
      withCredentials: true
    })
    .then(function (response) {
      // console.log(response.data)
      if(response.status == 200) {
        // console.log(response)
        router.push('/');
      }
    })
    .catch(function (error) {
      // console.log(error)
    });
  }

  const handleMenu = () => {
    const userDiv = document.querySelector("#userDiv") as any | null

    if(userDiv.style.display == "none" || userDiv.style.display == "") {
      userDiv.style.display = "flex"
    } else {
      userDiv.style.display = "none"
    }
  }

  let ref = useRef(null)

  useEffect(() => {
    const span = ref.current as any | null

    // console.log(span)

    span.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  }, [])

  return (
    <div className={styles.user}>
      <span ref={ref}>{props.name[0]}</span>
      <p>{props.name}</p>
      <FontAwesomeIcon onClick={handleMenu} icon={faChevronDown} />
      <div id={"userDiv"} className={styles.userDiv}>
        <span id={"Span"} onClick={handleClick}>Logout</span>
        <FontAwesomeIcon onClick={handleMenu} className={styles.i} icon={faXmark} />
      </div>
    </div>
  )
}

export default User;