'use client';
import { useEffect } from 'react';
import styles from './page.module.css'
import Form from '@/components/sginForm/form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  axios.defaults.withCredentials = true;

  const get = () => {
    axios.put(`${process.env.NEXT_PUBLIC_SERVER}/api/user/verify`, {
      withCredentials: true
    })
    .then(function (response) {
      // console.log(response.data)
      if(response.status == 200) {
        // console.log("Token Found")
        window.localStorage.setItem("id", response.data._id)
        router.push('/app/');
      }
    })
    .catch(function (error) {
      // console.log("No Token Found")
    });
  }

  useEffect(() => {
    // console.log("get")
    // setTimeout(() => {
      get()
    // }, 500)
  }, [])

  return (
    <>
    <main className={styles.main}>
      <Form name={"Welcome Back"} string={"Sign In To Your Account"} Button={"Signin"} sign={"Dont Hava Account, SignUp"} signLink={'/signup'} />
    </main>
    </>
  )
}
