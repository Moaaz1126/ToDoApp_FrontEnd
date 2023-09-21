import { InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './checkbox.module.css'
import axios from 'axios';

type InputParams = {
  type?: any,
  check?: any,
  onClick?: any,
  disabled?: any,
  onChange?: any | null
}

function Checkbox(props: InputParams) {

  const handleCheckbox = async (e: any, type?: any, frist?: any) => {
    // console.log("runed")
    let toggle = document.querySelectorAll("nav input")[+props.check] as any
    let p = document.querySelectorAll("nav p")[+props.check] as any
    let todo = document.querySelectorAll("nav")[+props.check] as any
    // console.log(todo, p, toggle, type, props.type)
    // console.log(p)
    
    let main = document.querySelectorAll("nav label")[props.check] as any

    // console.log(main)


    await setTimeout(() => {

      // console.log(main)
      if(false) {
        return e.checked = false
        
      } else {
        if (type == true) {
          // console.log("true")
          toggle.checked = true
          // console.log("checked lol", props.type )
          try {
            p.style.textDecoration = "line-through";
          } catch (error) {
            
          }
        } 
        if (type == false) {
          toggle.checked = false
          // console.log("false lol")
          try {
            p.style.textDecoration = "none";
          } catch (error) {
            
          }
        }
      }
    }, 0)

    if(type == true && frist == true) {
      main.style.background = "linear-gradient(to left bottom, #6fbffb, #a477e8)"
      main.style.border = "none"
    } else {
      if(toggle.checked == true ) {
        main.style.background = "linear-gradient(to left bottom, #6fbffb, #a477e8)"
        main.style.border = "none"
        try {
          p.style.textDecoration = "line-through";
        } catch (error) {
          
        }
      } else {
        main.style.background = "none"
        main.style.border = "2px solid #bdbdbd"
        try {
          p.style.textDecoration = "none";
        } catch (error) {
          
        }
      }
    }

    if(type != false && frist != true) {
      if(todo.getAttribute("data-id")) {
        let _id = todo.getAttribute("data-id")
        // console.log("the id", _id)
        axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/api/todo/${_id}`, {
          checked: toggle.checked
        }).then(function (response) {
          // console.log()
          let counter = document.querySelector("#counter") as any
          let todo = document.querySelectorAll("#todosList main input") as any
          let itemsCounter = 0;
          for(let i = 0; i < todo.length; i++) {
            if(todo[i].checked == false) {
              itemsCounter++
            }
          }
          counter.textContent = `${itemsCounter}`
        })
        .catch(function (error) {
          // console.log(error)
        });
      }
    }
    if(frist == true) {
      axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/todo/${window.localStorage.getItem("id")}`).then((response) => {
        toggle.checked = response.data[props.check].checked
        if(response.data[props.check].checked == true) {
          main.style.background = "linear-gradient(to left bottom, #6fbffb, #a477e8)"
          main.style.border = "none"
          try {
            p.style.textDecoration = "line-through";
          } catch (error) {
            
          }
        }
      }).catch((error) => {
        // console.log(error)
      });
    }
  }

  useEffect(() => {
    // if(props.type == true) {
      let ref = document.querySelectorAll("input")[props.check]
      handleCheckbox(ref, props.type, true)
    // }
  }, [])

  return (
    <main className={styles.body}>
      <label className= {styles.toggleButton} >
        <input className={styles.input} onLoad={handleCheckbox} onClick={handleCheckbox} placeholder="checkbox" type="checkbox" disabled={props.disabled}/>
        {/* {!CheckType && <input ref={refr} checked={true} placeholder="checkbox" type="checkbox" />} */}
        <div>
          <svg viewBox="0 0 44 44">
              <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
          </svg>
        </div>
      </label>
    </main>
  )
}

export default Checkbox;