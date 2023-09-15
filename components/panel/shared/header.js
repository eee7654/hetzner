import Icon_Notif from "../../icons/ic_notif"
import Icon_UProfile from "../../icons/ic_user_profile"
import { useState } from "react"
import NotifRow from "./notification_row"
import Link from 'next/link'

export default function Header(props){
    let [expaned,setExpanded] = useState(false)
    let showNotif = (e)=>{
        if(userExpaned){
            setUserExpanded(false)
        }
        if(!expaned){
            setExpanded(true)
        }else{
            setExpanded(false)
        }
    }
    let [userExpaned,setUserExpanded] = useState(false)
    let showUser = (e)=>{
        if(expaned){
            setExpanded(false)
        }
        if(!userExpaned){
            setUserExpanded(true)
        }else{
            setUserExpanded(false)
        }
    }
    return(
        <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
            <div className="container-fluid px-0">
            <div
                className="d-flex justify-content-between flex-row-reverse w-100"
                id="navbarSupportedContent"
            >
                <div className="d-flex align-items-center">
                {/* Search form */}
                <form
                    className="navbar-search form-inline"
                    id="navbar-search-main"
                    action=""
                    method="get"
                >
                    <div className="input-group input-group-merge search-bar rtl">
                    <button
                        type="submit"
                        className="input-group-text"
                        id="topbar-addon"
                    >
                        <svg
                        className="icon icon-xs"
                        x-description="Heroicon name: solid/search"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                        </svg>
                    </button>
                    <input
                        type="text"
                        name="search"
                        className="form-control text-end"
                        id="search"
                        placeholder="جستجو بر اساس "
                        aria-label="Search"
                        aria-describedby="topbar-addon"
                    />
                    </div>
                </form>
                {/* / Search form */}
                </div>
                {/* Navbar links */}
                <ul className="navbar-nav align-items-center">
                <li className="nav-item dropdown">
                    <a
                        className={`nav-link text-dark notification-bell unread dropdown-toggle ${expaned ? 'show' : ''}`}
                        data-unread-notifications="true"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded={expaned}
                        onClick={showNotif}
                    >
                        <Icon_Notif></Icon_Notif>
                    </a>
                    <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-start mt-2 py-0 ${expaned ? 'show' : ''}`}>
                        <div className="list-group list-group-flush">
                            <a
                            href="#"
                            className="text-center text-primary fw-bold border-bottom border-light py-3"
                            >
                            اعلان ها
                            </a>
                            <NotifRow></NotifRow>
                        </div>
                    </div>
                </li>
                <li className="nav-item dropdown ms-lg-3">
                    <a
                    className={`nav-link dropdown-toggle pt-1 px-0 ${userExpaned ? 'show' : ''}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={userExpaned}
                    onClick={showUser}
                    >
                    <div className="media d-flex flex-row-reverse align-items-center">
                        <Icon_UProfile avatar={props.avatar}></Icon_UProfile>
                        <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                        <div className="d-flex flex-column">
                            <span className="mb-0 font-small fw-bold text-gray-900">
                            {props.fullname}
                            </span>
                            <span className="mb-0 text-gray-500 align-self-end badge">
                            {props.role}
                            </span>
                        </div>
                        </div>
                    </div>
                    </a>
                    <div className={`dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1 ${userExpaned ? 'show' : ''}`}>
                        <Link href={'/admins/profile'}>
                            <a
                                className="dropdown-item d-flex align-items-center flex-row-reverse"
                            >
                                <svg
                                className="dropdown-icon text-gray-400 ms-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                    clipRule="evenodd"
                                />
                                </svg>
                                پروفایل
                            </a>
                        </Link>
                    <div role="separator" className="dropdown-divider my-1" />
                        <Link href={'/users/logout'}>
                            <a
                                className="dropdown-item d-flex align-items-center flex-row-reverse"
                            >
                                <svg
                                className="dropdown-icon text-danger ms-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                ></path>
                                </svg>
                                خروج
                            </a>
                        </Link>
                    </div>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    )
}