import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {authPages} from '../config/iron_session'
import {runMiddleware} from '../config/app_utils'
import csrf from '../config/csrf'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import SendSMS from '../components/sendsms'

export const getServerSideProps = authPages(async (context) => {
  const {req,res} = context
  await runMiddleware(req,res,csrf)
  const uSession = req.session;
  uSession.User = {
    status:0,
    auth:0
  }
  await uSession.save()
  return {
    props:{
      csrfToken:req.csrfToken()
    }
  }
});


export default function Home(srvData) {
  console.log(srvData)
  const [step,setStep] = useState(1)
  const [token,setToken] = useState(null)
  const [phone,setPhone] = useState(null)
  const router = useRouter()
  
  const checkCode = (event)=>{
    event.preventDefault()
    const code = event.target[0].value
    if(code.length == 5){
      axios.post('/api/users/check-code',{code:code,token:token,phone:phone},{headers:{'csrf-token':srvData.csrfToken}})
      .then((response)=>{
        if(response.data.status == 'ok'){
          if(response.data.action == 'register'){
            setStep(3)
          }else{
            router.push('/')
          }
        }
      }).catch((reason)=>{
        console.error(reason)
      })
    }else{
      console.log('phone length Incorrect')
    }
  }

  const registerUser = (event)=>{
    event.preventDefault()
    const fullName = event.target[0].value
    const eMail = event.target[1].value
    if(fullName.length >= 7 & eMail.length >= 5){
      axios.post('/api/users/register',{full_name:fullName,email:eMail,phone:phone},{headers:{'csrf-token':srvData.csrfToken}})
      .then((response)=>{
        if(response.data.status == 'ok'){
          router.push('/')
        }
      }).catch((reason)=>{

      })
    }else{
      console.log()
    }
  }
  
  const renderSteps = ()=>{
    switch(step){
      case 1:
        return(
          <SendSMS setPhone={setPhone} setToken={setToken} setStep={setStep} csrfToken={srvData.csrfToken}/>
        )
      case 2:
        return(
          <form onSubmit={checkCode}>
            <input className='form-control ab' type='number' placeholder='کد ارسال شده'/>
            <button className='btn btn-dark mt-2' type='submit'>تایید</button>
          </form>
        )
      case 3:
        return(
          <form onSubmit={registerUser}>
            <input className='form-control ab' type='text' placeholder='تام و نام خانوادگی'/>
            <input className='form-control ab' type='email' placeholder='ایمیل'/>
            <button className='btn btn-dark mt-2' type='submit'>تایید</button>
          </form>
        )
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>زوموتور | ورود</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} d-flex flex-column justify-content-center align-items-center`}>
        {renderSteps()}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
