'use client';
import axios from 'axios';
import styles from './page.module.css'
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '@/components/taskForm/taskForm';
import Todos from '@/components/todos/todos';
import DarkSwitch from '@/components/darkSwitch/darkSwitch';
import BgDark from '../../assets/bgDark.jpg';
import BgLight from '../../assets/bgLight.jpg';
import Image from 'next/image'

export default function Home() {
  const Router = useRouter();
  axios.defaults.withCredentials = true;

  let id = null;

  const get = () => {
    axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/user/verify`, {
      withCredentials: true
    })
    .then(function (response) {
      // console.log()
      if(response.status == 200) {
        // console.log(response)cx
        id = response.data._id
      }
    })
    .catch(function (error) {
      Router.push('/');
    });
  }

  useEffect(() => {
    // let toggle = document.querySelector("#toggle") as any
    // toggle.onchange = () => {
    //   let toggle2 = document.querySelector("#toggle") as any
    //   let HomeImg = document.querySelector("#HomeImg") as any

    //   if(toggle2 == true) {
    //     HomeImg.src = BgDark
    //   }
    // }
    get()
  }, [])

  let win;
  try {
    win = window.localStorage.getItem("id") as any
  } catch (error) {
    
  }

  return (
    <main className={styles.main}>
      <Image
        src={BgDark}
        className={styles.img}
        // width={100%}
        id={"HomeImg"}
        alt="Picture of the author"
      />
      <div className={styles.top}>
        <h1>TODO</h1>
        <DarkSwitch />
      </div>
      <div className={styles.buttom}>
        <TaskForm id={win} num={0} />
        <Todos id={"650212504091ac60e23047f2"} />
      </div>
    </main>
  )
}