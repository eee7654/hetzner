import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from '../../components/panel/shared/footer'
import Header from '../../components/panel/shared/header'
import SideNav from '../../components/panel/shared/sidenav'
import Loading from '../../components/shared/loading'
import {authPages} from '../../config/iron_session'
import csrf from '../../config/csrf'
import MobileNav from "../../components/panel/shared/sidenav/mobile_nav";
import SidebarMenu from "../../components/panel/shared/sidebar_menu";
import { HztEndPoint, runMiddleware,PaginationLabels } from '../../config/app_utils'
import ReqLoading from "../../components/shared/req_loading";
import axios from 'axios'
import { Col, Row, Table } from "react-bootstrap";
import { DatatableWrapper, Filter, Pagination, PaginationOptions, TableBody, TableHeader,EmptyTablePlaceholder } from "react-bs-datatable";
import { AdminMotorsColumn, UserServersColumn } from '../../config/table_columns'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export const getServerSideProps = authPages(async(context)=>{
  const {req,res} = context
  await runMiddleware(req,res,csrf)
  const uSession = req.session
  if(uSession.hasOwnProperty('Usr')){
    let csrfToken = req.csrfToken()
    let myName = uSession.Usr.uNAM
    let errors = null
    let myServers 
    try{
      let serversRes = await axios.get(`${HztEndPoint}/servers`,{headers:{Authorization:`Bearer ${process.env.HZT_TOKEN}`}})
      let allSrvs = serversRes.data.servers
      myServers = allSrvs.reduce((acc,server)=>{
        let labelUsr = server.labels.user
        if(labelUsr == myName){
          acc.push({
            id:server.id,
            name:server.name,
            status:server.status == 'off' ? 'خاموش' : 'روشن',
            ipv4:server.public_net.ipv4 != null ? {
              current_id:server.public_net.ipv4.id,
              current_ip:server.public_net.ipv4.ip
            } : null,
            dns:server.labels.dns
          })
        }
        return acc
      },[])
    }catch(reason){
      errors = reason
    }finally{
      await uSession.save()
    }
    return{
      props:{
        userData:uSession.Usr,
        csrfToken:csrfToken,
        servers:errors == null ? myServers : [],
        errors:errors
      }
    }
  }else{
    return {
      redirect: {
        destination: '/users/login',
        permanent: false,
      },
    }
  }
})

export default function(srvData){
  console.log(srvData)
  let [pageLoaded,setPageLoaded] = useState(false)
  let [reqLoad, setReqLoad] = useState(false);
  const [perPageRows,setPerpageRows] = useState(10)
  const [currentPage,setCurrentPage] = useState(1)
  const onPaginationChange = (pageNum)=>{
    setCurrentPage(pageNum)
    setReqLoad(true)
    /*axios.post('/api/admins/motors/fetch',{pgNum:pageNum,pgSize:perPageRows},{headers:{'csrf-token':srvData.csrfToken}})
    .then((response)=>{
      setMotors(response.data.motors)
      setReqLoad(false)
    })
    .catch((reason)=>{
      setReqLoad(false)
      Swal.fire({
        title: 'خطا در پردازش اطلاعات',
        text: 'در پردازش اطلاعات سیستم خطایی رخ داد لطفا دوباره سعی نمایید',
        icon: 'error',
        confirmButtonText: 'بستن',
        customClass: {
          confirmButton:'bg-dark'
        }
      })
    })*/
  }
  const doChangeIP = async(params)=>{
    setReqLoad(true)
    try{
      let chResponse = await axios.post('/api/users/servers/change-ip',{srvId:params[0],ipId:params[1]},{headers:{'csrf-token':srvData.csrfToken}})
      if(chResponse.data.status == 'ok'){
        window.location.reload()
      }else{
        toast('تغییر آی‌پی با خطا روبرو شد')
      }
    }catch(reason){
      toast('در پردازش درخواست شا خطای سیستمی رخ داد')
    }finally{
      setReqLoad(false)
    }
  }
  const saveChangeIP = async(params)=>{
    console.log(params)
    setReqLoad(true)
    try{
      let cfResponse = await axios.post('/api/users/servers/update-dns',{newIp:params[0],dns:params[1]},{headers:{'csrf-token':srvData.csrfToken}})
      if(cfResponse.data.status == 'ok'){
        toast('رکورد دی‌ان‌اس با موفقیت بروز شد')
      }else{
        toast('تغییر دی‌ان‌اس با خطا روبرو شد')
      }
    }catch(reason){
      toast('در پردازش درخواست شا خطای سیستمی رخ داد')
    }finally{
      setReqLoad(false)
    }
  }
  let [isInit,setIsInit] = useState(true)
  useEffect(()=>{
    if(!isInit){
        setCurrentPage(1)
        onPaginationChange(1)
    }else{
        setIsInit(false)
    }
    },[perPageRows])
  const router = useRouter()
    return (
        <>
          <Head>
              <title>داشبورد مدیریت</title>
          </Head>
          <Loading setLoaded={setPageLoaded}/>
          <>
              <MobileNav></MobileNav>
              <SidebarMenu srvData={srvData}></SidebarMenu>
              <main className={`content ${!pageLoaded && "d-none"}`}>
                <Header fullname={srvData.userData.uNAM} role="کاربر" avatar={'/2AHzDqEDEcj3.png'}></Header>
                <div className="content-wrap rtl">
                  <div className="row mt-3 pb-lg-3 pb-xl-3">
                    <div className="col-12 col-sm-12">
                      <div className="card">
                        <div className="card-header bg-gray-50 d-flex align-items-center justify-content-between">
                          <div className="title text-end fw-bolder">لیست سرورها</div>
                          <div className="buttons mr-auto">
                          </div>
                        </div>
                        <div className="card-body table-responsive">
                          {<DatatableWrapper 
                            body={srvData.servers}
                            headers={UserServersColumn({doChangeIP,saveChangeIP})}
                            paginationOptionsProps={{
                              initialState: {
                                rowsPerPage: 10,
                                options: [5, 10, 15, 20],
                              }
                            }}
                            sortProps={{initialState:{}}}
                          >
                            <Row className="mb-4 p-2">
                              <Col
                                  xs={12}
                                  lg={4}
                                  className="d-flex flex-col justify-content-end align-items-end"
                              >
                                <Filter placeholder="شروع جست‌وجو ..."/>
                              </Col>
                              <Col
                                  xs={12}
                                  sm={6}
                                  lg={4}
                                  className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                              >
                                <PaginationOptions labels={{beforeSelect:'نمایش'}} classes={{formControl:'select-bg ps-4 pe-2'}} controlledProps={{rowsPerPage:perPageRows,rowsPerPageOptions: [ 10, 20, 50, 100 ],onRowsPerPageChange:(number)=>setPerpageRows(number)}}/>
                              </Col>
                              <Col
                                  xs={12}
                                  sm={6}
                                  lg={4}
                                  className="d-flex flex-col justify-content-end align-items-end"
                              >
                                <Pagination alwaysShowPagination={false} labels={PaginationLabels} controlledProps={{currentPage:currentPage,maxPage:Math.ceil(srvData.rowsCount/perPageRows),onPaginationChange:onPaginationChange}} />
                              </Col>
                            </Row>
                            <Table className="table-striped table-hover">
                                <TableHeader />
                                <TableBody labels={{noResults:'داده‌ای یافت نشد !!!'}}>
                                  {srvData.servers.length == 0 && (
                                    <EmptyTablePlaceholder noResultsLabel="داده‌ای موجود نیست !!!" className="text-center"/>
                                  )}
                                </TableBody>
                            </Table>
                          </DatatableWrapper>}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<DeleteBrand
                    state={[showDeleteMotor,setShowDeleteMotor]}
                    setBrands={setMotors}
                    brandId={activeMotor} 
                    setReqLoad={setReqLoad}
                    csrfToken={srvData.csrfToken}
                                  />*/}
                  <ReqLoading isLoad={reqLoad}/>
                </div>
                <Footer/>
                <ToastContainer/>
              </main>
            </>
        </>
  )
}
