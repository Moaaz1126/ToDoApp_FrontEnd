import { InputHTMLAttributes } from 'react';
import Image from 'next/image'
import styles from './img.module.css'
import signinImg from '../../assets/auth.png';
function imgside() {
  return (
    <>
        <div className={styles.imgCon}>
          <Image
            src={signinImg}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
    </>
  )
}

export default imgside;
