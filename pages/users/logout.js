import Head from 'next/head'
import Link from 'next/link'
import csrf from '../../config/csrf'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {authPages} from '../../config/iron_session'
import Icon_Back from '../../components/icons/ic_back'
import Icon_Email from '../../components/icons/ic_email'
import Icon_Key from '../../components/icons/ic_key'
import axios from 'axios'
import Swal from 'sweetalert2'
import { runMiddleware } from '../../config/app_utils'
import Loading from '../../components/shared/loading'

export const getServerSideProps = authPages(async(context)=>{
  const { req, res } = context
  const uSession = req.session
  let resObj = {}
  if(uSession.hasOwnProperty('Usr')){
    delete uSession.Usr
    await uSession.save()
    return {
      redirect: {
        destination: '/users/login',
        permanent: false,
      }
    }
  }else{
    return {
      redirect: {
        destination: '/users/dashboard',
        permanent: false,
      }
    }
  }
  return resObj
})

export default function Login(){
  return (
    <></>
  )
}
