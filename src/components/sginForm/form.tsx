'use client';
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './form.module.css'
import Imgside from '../imgside/imgside';
import Buttom from '../buttom/buttom';
import InputArea from '../input/input';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type InputParams = {
  name: String,
  string: String,
  Button: String,
  sign: String,
  signLink: Url
}
function Form(props: InputParams) {
  const Router = useRouter();

  let usernameInp = document.querySelector('#username')
  let passwordInp = document.querySelector('#password')
  let err = document.querySelector("#err")

  const usernameInpFun = () => {
    let err = document.querySelector("#err") as any | undefined
    let usernameInp = document.querySelector('#username') as any | undefined
    let count = usernameInp.value.length > 3

    if(count) {
      usernameInp.style.borderColor = "#CDD9ED";
      err.style.display = "none"
    }
  }

  const passwordInpFun = () => {
    let passwordInp = document.querySelector('#password') as any | undefined
    let count2 = passwordInp.value.length > 5
    let err = document.querySelector("#err") as any | undefined

    if(count2) {
      passwordInp.style.borderColor = "#CDD9ED";
      err.style.display = "none"
    }
  }

  const InAndUp = (e: any) => {
    const path = window.location.pathname == "/signup"

    let usernameInp = document.querySelector('#username') as any | undefined
    let passwordInp = document.querySelector('#password') as any | undefined

    let count = usernameInp.value.length > 3
    let count2 = passwordInp.value.length > 5

    if(path && count && count2) {
      axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/user/`, {
        username: usernameInp.value,
        password: passwordInp.value
      }).then(async function (response) {
        let i = response.status == 200
        if(i) {
          Router.push('/');
        }
      }).catch(function (error) {
        // console.log(error)
        if(error.status == 400) {
          let err = document.querySelector("#err") as any | undefined

          err.style.display = "block"
          err.textContent = "The Username is unavailable"

          usernameInp.style.borderColor = "Red";
          usernameInp.focus()
        }
      });
    } else {
      if(!count) {
        usernameInp.style.borderColor = "Red";
        usernameInp.focus()

        let err = document.querySelector("#err") as any | undefined

        err.style.display = "block"
        err.textContent = "The Username must be 4 character"
      } else {
        passwordInp.style.borderColor = "Red"
        passwordInp.focus()

        let err = document.querySelector("#err") as any | undefined

        err.style.display = "block"
        err.textContent = "The Password must be 6 character"
      }
    } 
    if(!path && count && count2) {
      axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/user/signin`, {
        username: usernameInp.value,
        password: passwordInp.value
      }, {
        withCredentials: true
      })
      .then(function (response) {
        // console.log(response)
        if(response.status == 200) {
          let err = document.querySelector("#err") as any | undefined
          window.localStorage.setItem("id", response.data._id)
          err.style.display = "none"
          Router.push('/app/');
          
        }
      })
      .catch(function (error) {
        // console.log(error)
        if(error.status == 404) {

          let err = document.querySelector("#err") as any | undefined

          err.style.display = "block"
          err.textContent = "The Username or password in incorrect"

          usernameInp.style.borderColor = "Red";
          usernameInp.focus()
        }
      });
    }
  }

  return (
    <>
      <div className={styles.con}>
        <Imgside />
        <div className={styles.formCon}>
          <h2>{props.name}</h2>
          <p>{props.string}</p>
          <InputArea onchange={usernameInpFun} id="username" name={"Username"} type={"text"} place={"Your Username"} />
          <InputArea onchange={passwordInpFun} id="password" name={"Password"} type={"password"} place={"Your Password"} />

          <h6 id="err" className={styles.err}>ERROR</h6>

          <Buttom name={props.Button} onClick={InAndUp}/>

          <Link className={styles.link} href={props.signLink}>{props.sign}</Link>

          <h4>By Moaz Ahmad / Moaz1126</h4>
        </div>
      </div>
    </>
  )
}

export default Form;
