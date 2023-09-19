import { InputHTMLAttributes } from 'react';
import styles from './buttom.module.css'
type InputParams = {
  name: String,
  onClick: any
}
function Buttom(props: InputParams) {
  return (
    <>
      <button onClick={props.onClick} className={styles.button}>{props.name}</button>
    </>
  )
}

export default Buttom;
