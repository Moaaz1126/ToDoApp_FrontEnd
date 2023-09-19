import styles from './page.module.css'
import Form from '@/components/sginForm/form';

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <Form name={"Welcome"} string={"Create a new account"} Button={"SignUp"} sign={"Hava Account, Signin"} signLink={'/'} />
    </main>
    </>
  )
}
