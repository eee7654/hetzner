
export default function MobileNav(){
    return(
        <>
            <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
                <a className="navbar-brand me-lg-5" href="#">
                  <img
                    className="navbar-brand-dark"
                    src="/admins/images/brand/light.svg"
                    alt="logo"
                  />{" "}
                  <img
                    className="navbar-brand-light"
                    src="/admins/images/brand/dark.svg"
                    alt="logo"
                  />
                </a>
                <div className="d-flex align-items-center">
                  <button
                    className="navbar-toggler d-lg-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                </div>
              </nav>
        </>
    )
}