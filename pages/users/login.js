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
  await runMiddleware(req,res,csrf)
  const uSession = req.session
  let csrfToken = req.csrfToken()
  let resObj = {}
  if(!uSession.hasOwnProperty('Usr')){
    await uSession.save()
    resObj = {
      props:{
        csrfToken: csrfToken
      }
    }
  }else{
    resObj = {
      redirect: {
        destination: '/users/dashboard',
        permanent: false,
      }
    }
  }
  return resObj
})

export default function Login(srvData){
  let [pageLoaded, setPageLoaded] = useState(false);
  const router = useRouter()
  const doLogin = async(e)=>{
    e.preventDefault()
    let formData = e.target
    let username = formData[0].value
    let passwrd = formData[1].value
    let reqBody = { username: username, passwrd: passwrd }
    try{
      let response = await axios.post('/api/users/login',reqBody,{headers:{'csrf-token': srvData.csrfToken}})
      if(response.data.status == 'ok'){
        router.push('/users/dashboard')
      }
    }catch(reason){
      switch(reason.response.data.status){
        case 'notFound':
          Swal.fire({
            title: 'کاربر یافت نشد',
            text: 'حساب کاربری با مشخصات وارد شده وجود ندارد',
            icon: 'error',
            confirmButtonText: 'بستن',
            customClass: {
              confirmButton:'bg-dark'
            }
          })
          break
        case 'badPass':
          Swal.fire({
            title: 'رمز عبور اشتباه است',
            text: 'رمز عبور وارد شده برای این حساب کاربری صحیح نیست',
            icon: 'error',
            confirmButtonText: 'بستن',
            customClass: {
              confirmButton:'bg-dark'
            }
          })
          break
      }
    }
  }
  return (
    <>
      <Head>
        <title>ورود</title>
      </Head>
      <Loading setLoaded={setPageLoaded} />
      <main className={`content ${!pageLoaded && "d-none"}`} style={{marginRight:'0px'}}>
        <div id="flash_message" />
        <div className="content-wrap rtl">
          <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div className="container">
              <p className="text-center">
                <Link href="/" class="d-flex align-items-center justify-content-center flex-row-reverse">
                    <a>
                      بازگشت به صفحه اصلی <Icon_Back></Icon_Back>
                    </a>
                </Link>
              </p>
              <div className="row justify-content-center mb-5">
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                      <h1 className="mb-0 h3">ورود به سیستم</h1>
                    </div>
                    <form onSubmit={doLogin} className="mt-4">
                      <div className="form-group mb-4">
                        <label htmlFor="email">نام کاربری</label>
                        <div className="input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <Icon_Email></Icon_Email>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            autoFocus=""
                            required=""
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-group mb-4">
                          <label htmlFor="password">رمز عبور</label>
                          <div className="input-group">
                            <span className="input-group-text" id="basic-addon2">
                                <Icon_Key></Icon_Key>
                            </span>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              required=""
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-top mb-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue=""
                              id="remember"
                            />{" "}
                            <label
                              className="form-check-label mb-0"
                              htmlFor="remember"
                            >
                              یادآوری رمز عبور
                            </label>
                          </div>
                          <div>
                            <a href="#" className="small text-right">
                              رمز عبور خود را فراموش کرده اید؟
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="d-grid">
                        <button type="submit" className="btn btn-gray-800">
                          ورود
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
