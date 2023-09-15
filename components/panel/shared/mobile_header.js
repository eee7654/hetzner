import Link from 'next/link'

export default function MobileHeader(props){
    return(
        <>
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                <div className="collapse-close d-md-none">
                    <a href="#sidebarMenu" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true" aria-label="Toggle navigation">
                        <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-block me-4">
                        <h2 className="h5 mb-3">{props.fullname}</h2>
                        <Link href="/admins/logout">
                            <a className="btn btn-secondary btn-sm d-inline-flex align-items-center float-end">
                                <svg className="icon icon-xxs me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                    </path>
                                </svg>
                                خروج
                            </a>
                        </Link>
                    </div>
                    <div className="avatar-lg">
                        <img src={`/storage/avatars${props.avatar}`} className="card-img-top rounded-circle border-white" alt="UserPic" />
                    </div>
                </div>
                
            </div>
        </>
    )
}