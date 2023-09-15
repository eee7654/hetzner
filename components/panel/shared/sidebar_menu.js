import SideNav from './sidenav'
import { useRouter } from 'next/router'
import MobileHeader from './mobile_header'

export default function SidebarMenu(props){
    let srvData = props.srvData
    const router = useRouter()
    
    return (
        <>
            <nav
                id="sidebarMenu"
                className="sidebar d-lg-block bg-gray-800 text-white collapse"
                data-simplebar="">
                <div className="sidebar-inner px-4 pt-3">
                  <MobileHeader fullname={srvData.userData.uNAM} avatar={srvData.userData.avatar}></MobileHeader>
                  <SideNav uRole={srvData.userData.type} pUrl={router.pathname}></SideNav>
                </div>
            </nav>
        </>
    )
}