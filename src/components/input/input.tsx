import { InputHTMLAttributes } from 'react';
import styles from './input.module.css'
type InputParams = {
  name: String,
  type: any,
  place: any,
  id: any,
  onchange: any
}
function InputArea(props: InputParams) {
  return (
    <>
    <div className={styles.formGroup}>
      <span>{props.name}</span>
      <input onChange={props.onchange} id={props.id} className={styles.formField} type={props.type} placeholder={props.place} />
    </div>
    </>
  )
}

export default InputArea;
